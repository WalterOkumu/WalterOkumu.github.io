// Visual audit using Playwright (leveraging installed @playwright/test)
import { chromium, devices } from '@playwright/test';

const BASE_URL = process.env.AUDIT_BASE_URL || 'http://localhost:3000';

async function capture(page, path, name) {
  const safe = name.replace(/[^a-z0-9-_\.]/gi, '_');
  await page.screenshot({ path: `reports/screenshots/${safe}.png`, fullPage: true });
  console.log(`Saved: reports/screenshots/${safe}.png (${path})`);
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  try {
    // Desktop viewport
    const desktop = await browser.newContext({ viewport: { width: 1366, height: 900 } });
    const dpage = await desktop.newPage();

    // Home
    await dpage.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await capture(dpage, '/', 'home-desktop');

    // Blog listing
    await dpage.goto(`${BASE_URL}/blog`, { waitUntil: 'networkidle' });
    await capture(dpage, '/blog', 'blog-desktop');

    // First blog post (if exists) - exclude base /blog links
    const firstPost = dpage.locator('h2 a[href^="/blog/"]:not([href="/blog"])').first();
    if (await firstPost.count()) {
      const href = await firstPost.getAttribute('href');
      console.log('First post href (desktop):', href);
      await dpage.goto(`${BASE_URL}${href}`, { waitUntil: 'networkidle' });
      await capture(dpage, dpage.url(), 'post-desktop');
    }

    // Mobile (iPhone 12)
    const iphone = devices['iPhone 12'];
    const mobile = await browser.newContext({ ...iphone });
    const mpage = await mobile.newPage();

    await mpage.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    // Try to open the mobile menu by its accessible name
    const menuButton = mpage.getByRole('button', { name: 'Open main menu' });
    if (await menuButton.count()) {
      await menuButton.click();
      // small wait for menu animation
      await mpage.waitForTimeout(300);
    }
    await capture(mpage, '/', 'home-mobile');

    await mpage.goto(`${BASE_URL}/blog`, { waitUntil: 'networkidle' });
    await capture(mpage, '/blog', 'blog-mobile');

    const firstPostMobile = mpage.locator('h2 a[href^="/blog/"]:not([href="/blog"])').first();
    if (await firstPostMobile.count()) {
      const hrefM = await firstPostMobile.getAttribute('href');
      console.log('First post href (mobile):', hrefM);
      await mpage.goto(`${BASE_URL}${hrefM}`, { waitUntil: 'networkidle' });
      await capture(mpage, mpage.url(), 'post-mobile');
    }

    await desktop.close();
    await mobile.close();
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
