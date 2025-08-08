const { test, expect } = require('@playwright/test');

const appURL = 'https://tutorialsninja.com/demo/index.php?route=common/home';
const email = 'jackiebharathi6630@gmail.com';
const password = 'h#9EtdDDVGa7Yy';

test('Login and Logout successfully', async ({ page }) => {
  // 1. Navigate to the TutorialsNinja demo site
  await page.goto(appURL);

  // 2. Click My Account > Login
  await page.locator('a[title="My Account"]').click();
  await page.locator('a:text("Login")').click();

  // 3. Fill in credentials and login
  await page.locator('#input-email').fill(email);
  await page.locator('#input-password').fill(password);
  await page.locator('input[value="Login"]').click();

  // 4. Assert account page is displayed (unique <h2>My Account</h2> inside #content)
  await expect(page.locator('#content h2', { hasText: 'My Account' })).toBeVisible();

  // 5. Logout (wait for navigation)

  await Promise.all([
    page.waitForNavigation(),
    page.getByRole('link', { name: 'Logout' }).click()
  ]);

  // 6. Assert logout confirmation message
  await expect(page.locator('#content h1')).toHaveText('Account Logout');
});
