const puppeteer = require('puppeteer');

(async () => {
  console.log('🔍 Debugging CSS and Tailwind Configuration...\n');
  
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 10000 });
    await page.setViewport({ width: 1200, height: 800 });
    
    // Check all stylesheets loaded
    const stylesheets = await page.evaluate(() => {
      const sheets = Array.from(document.styleSheets);
      return sheets.map((sheet, i) => ({
        index: i,
        href: sheet.href,
        rules: sheet.cssRules ? sheet.cssRules.length : 'blocked',
        type: sheet.ownerNode ? sheet.ownerNode.tagName : 'unknown'
      }));
    });
    
    console.log('Loaded stylesheets:');
    stylesheets.forEach(sheet => {
      console.log(`  ${sheet.index}. ${sheet.type}: ${sheet.href || 'inline'} (${sheet.rules} rules)`);
    });
    
    // Check if specific Tailwind classes exist
    const tailwindCheck = await page.evaluate(() => {
      // Create test elements to check if Tailwind classes work
      const testClasses = [
        'hidden',
        'lg:block', 
        'lg:flex',
        'flex',
        'items-center',
        'space-x-1'
      ];
      
      const results = {};
      
      testClasses.forEach(className => {
        const testDiv = document.createElement('div');
        testDiv.className = className;
        document.body.appendChild(testDiv);
        
        const computedStyle = window.getComputedStyle(testDiv);
        results[className] = {
          display: computedStyle.display,
          flexDirection: computedStyle.flexDirection,
          alignItems: computedStyle.alignItems,
          gap: computedStyle.gap
        };
        
        document.body.removeChild(testDiv);
      });
      
      return results;
    });
    
    console.log('\nTailwind class behavior:');
    Object.entries(tailwindCheck).forEach(([className, styles]) => {
      console.log(`  ${className}:`);
      Object.entries(styles).forEach(([prop, value]) => {
        if (value && value !== 'normal' && value !== 'auto' && value !== 'initial') {
          console.log(`    ${prop}: ${value}`);
        }
      });
    });
    
    // Check viewport size and media queries
    const viewportInfo = await page.evaluate(() => {
      return {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        matchesLg: window.matchMedia('(min-width: 1024px)').matches,
        matchesMd: window.matchMedia('(min-width: 768px)').matches,
        matchesSm: window.matchMedia('(min-width: 640px)').matches
      };
    });
    
    console.log('\nViewport and media query info:');
    console.log(`  Viewport: ${viewportInfo.innerWidth}x${viewportInfo.innerHeight}px`);
    console.log(`  Matches lg (1024px+): ${viewportInfo.matchesLg}`);
    console.log(`  Matches md (768px+): ${viewportInfo.matchesMd}`);
    console.log(`  Matches sm (640px+): ${viewportInfo.matchesSm}`);
    
  } catch (error) {
    console.error('❌ CSS Debug failed:', error.message);
  } finally {
    await browser.close();
  }
})();