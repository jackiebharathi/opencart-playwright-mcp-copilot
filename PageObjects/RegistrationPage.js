// RegistrationPage.js
const { expect } = require('@playwright/test');

class RegistrationPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.firstName = page.locator('#input-firstname');
        this.lastName = page.locator('#input-lastname');
        this.email = page.locator('#input-email');
        this.telephone = page.locator('#input-telephone');
        this.password = page.locator('#input-password');
        this.confirmPassword = page.locator('#input-confirm');
        this.privacyPolicy = page.locator('input[type="checkbox"][name="agree"]');
        this.continueBtn = page.locator('input[type="submit"][value="Continue"]');
    }

    async fillForm({ firstName, lastName, email, telephone, password }) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.telephone.fill(telephone);
        await this.password.fill(password);
        await this.confirmPassword.fill(password);
    }

    async acceptPrivacyPolicy() {
        await this.privacyPolicy.check();
    }

    async submit() {
        await this.continueBtn.click();
    }
}

module.exports = { RegistrationPage };
