// registration.spec.js
const { test } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { HomePage } = require('../PageObjects/HomePage');
const { RegistrationPage } = require('../PageObjects/RegistrationPage');
const { ConfirmationPage } = require('../PageObjects/ConfirmationPage');
const { faker } = require('@faker-js/faker');

function getBaseUrl() {
    const configPath = path.resolve(__dirname, '../config.properties');
    const content = fs.readFileSync(configPath, 'utf-8');
    const match = content.match(/BASE_URL=(.*)/);
    return match ? match[1].trim() : '';
}

test('User can register successfully', async ({ page }) => {
    const baseUrl = getBaseUrl();
    const homePage = new HomePage(page);
    const registrationPage = new RegistrationPage(page);
    const confirmationPage = new ConfirmationPage(page);

    await homePage.goto(baseUrl);
    await homePage.clickAccount();
    await homePage.clickRegister();

    const userData = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        telephone: faker.phone.number('##########'),
        password: faker.internet.password(10)
    };

    await registrationPage.fillForm(userData);
    await registrationPage.acceptPrivacyPolicy();
    await registrationPage.submit();
    await confirmationPage.assertSuccess();
});
