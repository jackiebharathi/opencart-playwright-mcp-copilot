// ConfirmationPage.js
const { expect } = require('@playwright/test');

class ConfirmationPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.successMsg = page.locator('#content h1');
    }

    async assertSuccess() {
        await expect(this.successMsg).toHaveText('Your Account Has Been Created!');
    }
}

module.exports = { ConfirmationPage };
