const { test, expect } = require('../fixtures/customFixtures');
const { LoginPage } = require('../PageObjects/LoginPage');
const xlsx = require('xlsx');
const path = require('path');
const logger = require('../utils/logger');

// Read test data from Excel file
function getLoginData() {
  const workbook = xlsx.readFile(path.join(__dirname, '../testsData/Opencart_loginData.xlsx'));
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);
  console.log('Excel Data:', JSON.stringify(data, null, 2));
  return data;
}

test.describe('Data Driven Login Tests', () => {
  const loginData = getLoginData(); // 👈 Load data synchronously here

  for (const creds of loginData) {
    test(`Login test for user: ${creds.username}`, async ({ pageWithLogger: page }) => {
      const loginPage = new LoginPage(page);

      logger.info(`Starting login test for user: ${creds.username}`);
      await page.goto(process.env.BASE_URL + '/index.php?route=account/logout');
      await page.goto(process.env.BASE_URL + '/index.php?route=account/login');

      await page.getByRole('textbox', { name: 'E-Mail Address' }).fill(creds.username);
      await page.getByRole('textbox', { name: 'Password' }).fill(creds.password);
      await page.getByRole('button', { name: 'Login' }).click();

      await page.waitForTimeout(1000);

      const errorAlert = page.locator('.alert.alert-danger.alert-dismissible');
      const isErrorVisible = await errorAlert.isVisible().catch(() => false);

      if (isErrorVisible) {
        console.log(`Login failed for user: ${creds.username}`);
        await expect(errorAlert).toContainText('Warning: No match for E-Mail Address and/or Password.');
      } else {
        console.log(`Login appears successful for user: ${creds.username}`);
        await expect(page).toHaveURL(/route=account\/account/);
      }
    });
  }
});
