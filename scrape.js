const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: "new"
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  
  console.log('Navigating to Figma...');
  await page.goto('https://www.figma.com/make/uj9ukAklMazlFbkol4W0JG/Building-website-creation?t=zxw0YArsJnCaxkuj-0', {
    waitUntil: 'networkidle0',
    timeout: 30000
  });

  console.log('Taking screenshot...');
  // Ensure we get a good viewport of the content
  await new Promise(r => setTimeout(r, 5000)); // Wait an extra 5 seconds for React to finish rendering
  await page.screenshot({ path: 'screenshot_new.png', fullPage: true });
  
  console.log('Getting HTML...');
  const html = await page.content();
  const fs = require('fs');
  fs.writeFileSync('rendered_figma.html', html);
  
  await browser.close();
  console.log('Done!');
})();
