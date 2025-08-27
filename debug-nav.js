const puppeteer = require('puppeteer');

(async () => {
  console.log('🔍 Debugging Desktop Navigation Visibility Issue...\n');
  
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 10000 });
    await page.setViewport({ width: 1200, height: 800 });
    
    // Deep dive into the desktop navigation structure
    const debugInfo = await page.evaluate(() => {
      // Find all elements with hidden class
      const hiddenElements = Array.from(document.querySelectorAll('.hidden'));
      
      // Find the specific navigation container
      const navContainers = hiddenElements.filter(el => 
        el.className.includes('lg:block') || el.className.includes('lg:flex')
      );
      
      const results = [];
      
      navContainers.forEach((container, i) => {
        const rect = container.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(container);
        const menubar = container.querySelector('ul[role="menubar"]');
        
        const containerInfo = {
          index: i,
          classes: container.className,
          display: computedStyle.display,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          hasMenubar: !!menubar,
          children: container.children.length,
          links: []
        };
        
        if (menubar) {
          const links = Array.from(menubar.querySelectorAll('a'));
          links.forEach((link, li) => {
            const linkRect = link.getBoundingClientRect();
            const linkStyle = window.getComputedStyle(link);
            containerInfo.links.push({
              index: li,
              text: link.textContent.trim().substring(0, 20),
              display: linkStyle.display,
              width: Math.round(linkRect.width),
              height: Math.round(linkRect.height),
              classes: link.className
            });
          });
        }
        
        results.push(containerInfo);
      });
      
      return results;
    });
    
    console.log('Navigation containers found:', debugInfo.length);
    debugInfo.forEach((info, i) => {
      console.log(`${i + 1}. Container with classes: ${info.classes.substring(0, 80)}...`);
      console.log(`   Display: ${info.display}, Size: ${info.width}x${info.height}px`);
      console.log(`   Has menubar: ${info.hasMenubar}, Children: ${info.children}`);
      
      if (info.links.length > 0) {
        console.log('   Links:');
        info.links.forEach(link => {
          console.log(`     ${link.index}. "${link.text}" - ${link.display} ${link.width}x${link.height}px`);
        });
      }
    });
    
    // Check if Tailwind classes are working
    console.log('\nTesting Tailwind class behavior...');
    const tailwindTest = await page.evaluate(() => {
      const testDiv = document.createElement('div');
      testDiv.className = 'hidden lg:block w-10 h-10 bg-red-500';
      document.body.appendChild(testDiv);
      
      const computedStyle = window.getComputedStyle(testDiv);
      const result = {
        display: computedStyle.display,
        width: computedStyle.width,
        height: computedStyle.height,
        backgroundColor: computedStyle.backgroundColor
      };
      
      document.body.removeChild(testDiv);
      return result;
    });
    
    console.log('Test div with "hidden lg:block w-10 h-10 bg-red-500":');
    console.log(`  Display: ${tailwindTest.display}`);
    console.log(`  Width: ${tailwindTest.width}`);
    console.log(`  Height: ${tailwindTest.height}`);
    console.log(`  Background: ${tailwindTest.backgroundColor}`);
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  } finally {
    await browser.close();
  }
})();