const puppeteer = require('puppeteer');

(async () => {
  console.log('🔍 Testing Fixed Desktop Navigation...\n');
  
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 10000 });
    console.log('✅ Page loaded successfully');
    
    // Test desktop view (1200px width)
    await page.setViewport({ width: 1200, height: 800 });
    await new Promise(resolve => setTimeout(resolve, 200)); // Wait for resize
    
    console.log('\n🖥️  Testing Desktop Navigation (1200px width)...');
    
    const desktopNavInfo = await page.evaluate(() => {
      // Find elements with our custom desktop-navigation class
      const desktopNavs = Array.from(document.querySelectorAll('.desktop-navigation'));
      
      if (desktopNavs.length === 0) return { found: false, reason: 'No .desktop-navigation elements found' };
      
      const results = [];
      
      desktopNavs.forEach((nav, i) => {
        const rect = nav.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(nav);
        const menubar = nav.querySelector('ul[role="menubar"]');
        
        const navInfo = {
          index: i,
          display: computedStyle.display,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          visible: rect.width > 0 && rect.height > 0,
          hasMenubar: !!menubar,
          links: []
        };
        
        if (menubar) {
          const links = Array.from(menubar.querySelectorAll('a'));
          links.forEach((link, li) => {
            const linkRect = link.getBoundingClientRect();
            navInfo.links.push({
              index: li,
              text: link.textContent.trim().substring(0, 15),
              width: Math.round(linkRect.width),
              height: Math.round(linkRect.height),
              visible: linkRect.width > 0 && linkRect.height > 0
            });
          });
        }
        
        results.push(navInfo);
      });
      
      return { found: true, containers: results };
    });
    
    if (desktopNavInfo.found) {
      console.log(`✅ Found ${desktopNavInfo.containers.length} desktop navigation containers`);
      
      desktopNavInfo.containers.forEach((nav, i) => {
        console.log(`\n  Container ${i + 1}:`);
        console.log(`    Display: ${nav.display}, Size: ${nav.width}x${nav.height}px, Visible: ${nav.visible}`);
        console.log(`    Has menubar: ${nav.hasMenubar}`);
        
        if (nav.links.length > 0) {
          console.log(`    Navigation Links:`);
          nav.links.forEach(link => {
            const status = link.visible ? '✅' : '❌';
            console.log(`      ${status} "${link.text}": ${link.width}x${link.height}px`);
          });
        }
      });
      
      // Count total visible links
      const totalVisibleLinks = desktopNavInfo.containers.reduce((total, nav) => 
        total + nav.links.filter(link => link.visible).length, 0
      );
      
      if (totalVisibleLinks > 0) {
        console.log(`\n✅ SUCCESS: ${totalVisibleLinks} navigation links are now visible!`);
      } else {
        console.log(`\n❌ ISSUE: Navigation containers found but links still have 0px dimensions`);
      }
    } else {
      console.log(`❌ ${desktopNavInfo.reason}`);
    }
    
    // Test mobile view  
    console.log('\n📱 Testing Mobile Navigation (375px width)...');
    await page.setViewport({ width: 375, height: 667 });
    await new Promise(resolve => setTimeout(resolve, 200)); // Wait for resize
    
    const mobileCheck = await page.evaluate(() => {
      const desktopNavs = Array.from(document.querySelectorAll('.desktop-navigation'));
      const mobileButton = document.querySelector('[data-mobile-menu="true"]');
      
      const desktopHidden = desktopNavs.every(nav => {
        const rect = nav.getBoundingClientRect();
        return rect.width === 0 && rect.height === 0;
      });
      
      return {
        desktopNavsHidden: desktopHidden,
        desktopNavCount: desktopNavs.length,
        mobileButtonFound: !!mobileButton
      };
    });
    
    if (mobileCheck.desktopNavsHidden) {
      console.log('✅ Desktop navigation properly hidden on mobile');
    } else {
      console.log('❌ Desktop navigation still visible on mobile');
    }
    
    if (mobileCheck.mobileButtonFound) {
      console.log('✅ Mobile menu button found');
      
      // Test mobile menu functionality
      const mobileMenuButton = await page.$('[data-mobile-menu="true"]');
      await mobileMenuButton.click();
      await new Promise(resolve => setTimeout(resolve, 500)); // Wait for animation
      
      const mobileMenuVisible = await page.evaluate(() => {
        const panel = document.querySelector('[data-mobile-menu-panel="true"]');
        if (!panel) return false;
        
        const rect = panel.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      });
      
      if (mobileMenuVisible) {
        console.log('✅ Mobile menu panel opens correctly');
      } else {
        console.log('❌ Mobile menu panel not visible after click');
      }
    } else {
      console.log('❌ Mobile menu button not found');
    }
    
    console.log('\n🎉 Navigation Fix Test Complete!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
})();