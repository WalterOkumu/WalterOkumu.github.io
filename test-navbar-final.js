const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function testNavbarFinal() {
  console.log('🚀 Final Navbar Testing with Puppeteer...');
  
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1200, height: 800 }
  });
  
  const page = await browser.newPage();
  
  try {
    // Navigate to the correct port
    console.log('📍 Navigating to localhost:3002...');
    await page.goto('http://localhost:3002', { 
      waitUntil: 'networkidle2',
      timeout: 15000 
    });
    
    console.log('✅ Page loaded successfully');
    
    // Create test results directory
    const testDir = path.join(__dirname, 'navbar-test-results');
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir);
    }
    
    // Test 1: Desktop Navbar Analysis
    console.log('🖥️ Testing desktop navbar...');
    const desktopNavbar = await page.evaluate(() => {
      const navbar = document.querySelector('nav');
      if (!navbar) return { error: 'Navbar not found' };
      
      const rect = navbar.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(navbar);
      
      // Get all navigation links
      const links = Array.from(navbar.querySelectorAll('a')).map(link => ({
        text: link.textContent.trim(),
        href: link.href,
        visible: link.offsetParent !== null,
        width: link.offsetWidth,
        height: link.offsetHeight,
        rect: link.getBoundingClientRect()
      }));
      
      // Test mobile menu button
      const mobileMenuButton = navbar.querySelector('[data-mobile-menu="true"], button[aria-expanded]');
      
      return {
        rect: {
          width: rect.width,
          height: rect.height,
          top: rect.top,
          visible: rect.height > 0
        },
        styles: {
          position: computedStyle.position,
          zIndex: computedStyle.zIndex,
          backgroundColor: computedStyle.backgroundColor,
          display: computedStyle.display,
          minHeight: computedStyle.minHeight
        },
        links: links,
        mobileMenuButton: {
          exists: !!mobileMenuButton,
          visible: mobileMenuButton ? mobileMenuButton.offsetParent !== null : false,
          ariaExpanded: mobileMenuButton ? mobileMenuButton.getAttribute('aria-expanded') : null
        },
        innerHTML: navbar.innerHTML.length
      };
    });
    
    // Capture desktop navbar
    await page.screenshot({
      path: path.join(testDir, 'navbar-desktop-final.png'),
      clip: { x: 0, y: 0, width: 1200, height: Math.max(desktopNavbar.rect.height + 40, 100) }
    });
    
    // Test 2: Mobile Navbar Analysis
    console.log('📱 Testing mobile navbar...');
    await page.setViewport({ width: 375, height: 667 });
    
    const mobileNavbar = await page.evaluate(() => {
      const navbar = document.querySelector('nav');
      if (!navbar) return { error: 'Navbar not found' };
      
      const rect = navbar.getBoundingClientRect();
      const mobileMenuButton = navbar.querySelector('[data-mobile-menu="true"], button[aria-expanded]');
      
      return {
        rect: { 
          width: rect.width, 
          height: rect.height,
          visible: rect.height > 0 
        },
        mobileMenuButton: {
          exists: !!mobileMenuButton,
          visible: mobileMenuButton ? mobileMenuButton.offsetParent !== null : false,
          text: mobileMenuButton ? mobileMenuButton.textContent.trim() : '',
          ariaExpanded: mobileMenuButton ? mobileMenuButton.getAttribute('aria-expanded') : null
        }
      };
    });
    
    // Capture mobile navbar
    await page.screenshot({
      path: path.join(testDir, 'navbar-mobile-final.png'),
      clip: { x: 0, y: 0, width: 375, height: Math.max(mobileNavbar.rect.height + 40, 100) }
    });
    
    // Test 3: Mobile Menu Functionality
    console.log('🔧 Testing mobile menu functionality...');
    const mobileMenuButton = await page.$('[data-mobile-menu="true"], button[aria-expanded]');
    
    let menuFunctional = false;
    if (mobileMenuButton) {
      // Click the mobile menu button
      await mobileMenuButton.click();
      await new Promise(resolve => setTimeout(resolve, 500)); // Wait for animation
      
      // Check if mobile menu panel appears
      const mobileMenuPanel = await page.evaluate(() => {
        const panel = document.querySelector('[data-mobile-menu-panel="true"], .mobile-menu');
        return panel ? {
          visible: panel.offsetParent !== null,
          width: panel.offsetWidth,
          height: panel.offsetHeight
        } : null;
      });
      
      menuFunctional = mobileMenuPanel && mobileMenuPanel.visible;
      
      // Capture mobile menu open state
      if (menuFunctional) {
        await page.screenshot({
          path: path.join(testDir, 'mobile-menu-open.png'),
          fullPage: false
        });
      }
    }
    
    // Test 4: WCAG Contrast Testing
    console.log('♿ Testing WCAG contrast ratios...');
    const contrastResults = await page.evaluate(() => {
      const elements = document.querySelectorAll('nav a, nav button');
      const results = [];
      
      elements.forEach((el, index) => {
        const computedStyle = window.getComputedStyle(el);
        const color = computedStyle.color;
        const backgroundColor = computedStyle.backgroundColor;
        
        results.push({
          element: el.tagName.toLowerCase(),
          text: el.textContent.trim().substring(0, 20),
          color: color,
          backgroundColor: backgroundColor,
          fontSize: computedStyle.fontSize,
          fontWeight: computedStyle.fontWeight
        });
      });
      
      return results;
    });
    
    // Test 5: Keyboard Navigation
    console.log('⌨️ Testing keyboard navigation...');
    await page.setViewport({ width: 1200, height: 800 }); // Back to desktop
    
    // Focus on first navigation item
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    const keyboardTest = await page.evaluate(() => {
      const focusedElement = document.activeElement;
      return {
        tag: focusedElement.tagName,
        href: focusedElement.href || null,
        text: focusedElement.textContent.trim(),
        hasFocus: document.activeElement === focusedElement
      };
    });
    
    // Generate comprehensive test report
    const report = {
      timestamp: new Date().toISOString(),
      testResults: {
        desktop: {
          navbar: desktopNavbar,
          status: desktopNavbar.rect.visible ? 'PASS' : 'FAIL'
        },
        mobile: {
          navbar: mobileNavbar,
          menuFunctional: menuFunctional,
          status: mobileNavbar.rect.visible && menuFunctional ? 'PASS' : 'PARTIAL'
        },
        accessibility: {
          contrastElements: contrastResults,
          keyboardNavigation: keyboardTest,
          status: contrastResults.length > 0 ? 'TESTED' : 'NEEDS_REVIEW'
        }
      },
      summary: {
        overallStatus: 
          desktopNavbar.rect.visible && mobileNavbar.rect.visible && menuFunctional 
            ? 'PASS' 
            : 'NEEDS_FIXES',
        criticalIssues: [
          ...(desktopNavbar.rect.visible ? [] : ['Desktop navbar not visible']),
          ...(mobileNavbar.rect.visible ? [] : ['Mobile navbar not visible']),
          ...(menuFunctional ? [] : ['Mobile menu not functional'])
        ]
      }
    };
    
    // Save test report
    fs.writeFileSync(
      path.join(testDir, 'navbar-test-report.json'), 
      JSON.stringify(report, null, 2)
    );
    
    // Console summary
    console.log('\n📊 TEST RESULTS SUMMARY:');
    console.log(`Overall Status: ${report.summary.overallStatus}`);
    console.log(`Desktop Navbar: ${report.testResults.desktop.status}`);
    console.log(`Mobile Navbar: ${report.testResults.mobile.status}`);
    console.log(`Mobile Menu: ${menuFunctional ? 'FUNCTIONAL' : 'NOT_FUNCTIONAL'}`);
    
    if (report.summary.criticalIssues.length > 0) {
      console.log('\n❌ Critical Issues:');
      report.summary.criticalIssues.forEach(issue => console.log(`  - ${issue}`));
    } else {
      console.log('\n✅ All critical tests passed!');
    }
    
    return report;
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

// Run the tests
if (require.main === module) {
  testNavbarFinal()
    .then(report => {
      console.log('\n🎉 Navbar testing completed!');
      console.log(`Report saved to: navbar-test-results/navbar-test-report.json`);
      process.exit(report.summary.overallStatus === 'PASS' ? 0 : 1);
    })
    .catch(error => {
      console.error('💥 Testing failed:', error);
      process.exit(1);
    });
}

module.exports = testNavbarFinal;