const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'local_screenshot.png', fullPage: true });
  await browser.close();
  console.log('Screenshot saved to local_screenshot.png');
})();
