const { chromium } = require('@playwright/test');

module.exports = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
    { waitUntil: 'domcontentloaded' }
  );

  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  // SPA-safe wait
  await page.getByRole('heading', { name: 'Dashboard' }).waitFor({
    timeout: 60000
  });

  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
};
