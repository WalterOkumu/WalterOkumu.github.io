const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function analyzeNavbarFooter() {
  console.log('🚀 Starting Puppeteer analysis of Navbar and Footer...');
  
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1200, height: 800 }
  });
  
  const page = await browser.newPage();
  
  try {
    // Start the development server in the background if not running
    console.log('📍 Navigating to localhost:3000...');
    await page.goto('http://localhost:3000', { 
      waitUntil: 'networkidle2',
      timeout: 10000 
    });
    
    console.log('✅ Page loaded successfully');
    
    // Create screenshots directory
    const screenshotsDir = path.join(__dirname, 'puppeteer-analysis');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir);
    }
    
    // Capture full page screenshot
    console.log('📸 Capturing full page screenshot...');
    await page.screenshot({ 
      path: path.join(screenshotsDir, 'full-page.png'),
      fullPage: true 
    });
    
    // Analyze navbar
    console.log('🔍 Analyzing navbar...');
    const navbarData = await page.evaluate(() => {
      const navbar = document.querySelector('nav, header, [role="navigation"]');
      if (!navbar) return { error: 'Navbar not found' };
      
      const rect = navbar.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(navbar);
      
      // Get all navigation links
      const links = Array.from(navbar.querySelectorAll('a')).map(link => ({
        text: link.textContent.trim(),
        href: link.href,
        visible: link.offsetParent !== null,
        rect: link.getBoundingClientRect()
      }));
      
      // Check for mobile menu
      const mobileMenuButton = navbar.querySelector('[data-mobile-menu], .mobile-menu-toggle, button[aria-expanded]');
      const mobileMenu = navbar.querySelector('.mobile-menu, [data-mobile-menu-panel]');
      
      return {
        rect: {
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: rect.left
        },
        styles: {
          position: computedStyle.position,
          zIndex: computedStyle.zIndex,
          backgroundColor: computedStyle.backgroundColor,
          display: computedStyle.display,
          flexDirection: computedStyle.flexDirection,
          justifyContent: computedStyle.justifyContent,
          alignItems: computedStyle.alignItems
        },
        links: links,
        mobileMenu: {
          hasButton: !!mobileMenuButton,
          hasMenu: !!mobileMenu,
          buttonVisible: mobileMenuButton ? mobileMenuButton.offsetParent !== null : false
        },
        classList: Array.from(navbar.classList),
        innerHTML: navbar.innerHTML.length
      };
    });
    
    // Capture navbar-specific screenshot
    if (!navbarData.error) {
      await page.screenshot({
        path: path.join(screenshotsDir, 'navbar-desktop.png'),
        clip: {
          x: 0,
          y: 0,
          width: 1200,
          height: Math.max(navbarData.rect.height + 20, 80)
        }
      });
    }
    
    // Analyze footer
    console.log('🔍 Analyzing footer...');
    const footerData = await page.evaluate(() => {
      const footer = document.querySelector('footer, [role="contentinfo"]');
      if (!footer) return { error: 'Footer not found' };
      
      const rect = footer.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(footer);
      
      // Get all footer links
      const links = Array.from(footer.querySelectorAll('a')).map(link => ({
        text: link.textContent.trim(),
        href: link.href,
        visible: link.offsetParent !== null,
        rect: link.getBoundingClientRect()
      }));
      
      // Get footer sections
      const sections = Array.from(footer.querySelectorAll('div, section')).map(section => ({
        classes: Array.from(section.classList),
        textContent: section.textContent.trim().substring(0, 100) + '...',
        hasLinks: section.querySelectorAll('a').length > 0
      }));
      
      return {
        rect: {
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: rect.left
        },
        styles: {
          position: computedStyle.position,
          backgroundColor: computedStyle.backgroundColor,
          display: computedStyle.display,
          padding: computedStyle.padding,
          margin: computedStyle.margin
        },
        links: links,
        sections: sections.slice(0, 5), // Limit to first 5 sections
        classList: Array.from(footer.classList),
        innerHTML: footer.innerHTML.length
      };
    });
    
    // Capture footer-specific screenshot
    if (!footerData.error) {
      await page.screenshot({
        path: path.join(screenshotsDir, 'footer-desktop.png'),
        clip: {
          x: 0,
          y: Math.max(footerData.rect.top - 20, 0),
          width: 1200,
          height: Math.min(footerData.rect.height + 40, 400)
        }
      });
    }
    
    // Test mobile responsiveness
    console.log('📱 Testing mobile responsiveness...');
    await page.setViewport({ width: 375, height: 667 }); // iPhone SE size
    
    await page.screenshot({ 
      path: path.join(screenshotsDir, 'mobile-full.png'),
      fullPage: true 
    });
    
    // Mobile navbar analysis
    const mobileNavbarData = await page.evaluate(() => {
      const navbar = document.querySelector('nav, header, [role="navigation"]');
      if (!navbar) return { error: 'Navbar not found' };
      
      const rect = navbar.getBoundingClientRect();
      const mobileMenuButton = navbar.querySelector('[data-mobile-menu], .mobile-menu-toggle, button[aria-expanded]');
      const mobileMenu = navbar.querySelector('.mobile-menu, [data-mobile-menu-panel]');
      
      return {
        rect: { width: rect.width, height: rect.height },
        mobileMenuButton: {
          exists: !!mobileMenuButton,
          visible: mobileMenuButton ? mobileMenuButton.offsetParent !== null : false,
          text: mobileMenuButton ? mobileMenuButton.textContent.trim() : ''
        },
        mobileMenu: {
          exists: !!mobileMenu,
          visible: mobileMenu ? mobileMenu.offsetParent !== null : false
        }
      };
    });
    
    // Capture mobile navbar
    await page.screenshot({
      path: path.join(screenshotsDir, 'navbar-mobile.png'),
      clip: {
        x: 0,
        y: 0,
        width: 375,
        height: Math.max((mobileNavbarData.rect?.height || 60) + 20, 80)
      }
    });
    
    // Generate analysis report
    const report = {
      timestamp: new Date().toISOString(),
      viewport: {
        desktop: { width: 1200, height: 800 },
        mobile: { width: 375, height: 667 }
      },
      navbar: {
        desktop: navbarData,
        mobile: mobileNavbarData
      },
      footer: {
        desktop: footerData
      },
      screenshots: [
        'full-page.png',
        'navbar-desktop.png', 
        'footer-desktop.png',
        'mobile-full.png',
        'navbar-mobile.png'
      ]
    };
    
    // Save analysis report
    fs.writeFileSync(
      path.join(screenshotsDir, 'analysis-report.json'), 
      JSON.stringify(report, null, 2)
    );
    
    console.log('📊 Analysis complete! Report saved to puppeteer-analysis/');
    console.log('🔍 Issues detected:');
    
    // Quick issue detection
    if (navbarData.error) {
      console.log('❌ Navbar: Not found or not accessible');
    } else {
      if (navbarData.links.length === 0) {
        console.log('⚠️  Navbar: No navigation links found');
      }
      if (!navbarData.mobileMenu.hasButton) {
        console.log('⚠️  Navbar: No mobile menu button found');
      }
    }
    
    if (footerData.error) {
      console.log('❌ Footer: Not found or not accessible');
    } else {
      if (footerData.links.length === 0) {
        console.log('⚠️  Footer: No links found');
      }
    }
    
    return report;
    
  } catch (error) {
    console.error('❌ Analysis failed:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

// Run the analysis
if (require.main === module) {
  analyzeNavbarFooter()
    .then(report => {
      console.log('✅ Analysis completed successfully');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Analysis failed:', error);
      process.exit(1);
    });
}

module.exports = analyzeNavbarFooter;

