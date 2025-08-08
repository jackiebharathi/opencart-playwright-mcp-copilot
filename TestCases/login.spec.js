// login.spec.js
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { HomePage } = require('../PageObjects/HomePage');
const { LoginPage } = require('../PageObjects/LoginPage');

function getBaseUrl() {
    const configPath = path.resolve(__dirname, '../config.properties');
    const content = fs.readFileSync(configPath, 'utf-8');
    const match = content.match(/BASE_URL=(.*)/);
    return match ? match[1].trim() : '';
}

test('User can login successfully', async ({ page }) => {
    const baseUrl = getBaseUrl();
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto(baseUrl);
    await homePage.clickAccount();
    await page.locator('a:text("Login")').click();

    await loginPage.login('jackiebharathi6630@gmail.com', 'h#9EtdDDVGa7Yy');

    // Assert: "Edit your account information" link is visible
    await expect(page.locator('a:text("Edit your account information")')).toBeVisible();
});
