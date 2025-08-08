// HomePage.js
const { expect } = require('@playwright/test');

class HomePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.accountMenu = page.locator('a[title="My Account"]');
        this.registerLink = page.locator('a:text("Register")');
    }

    async goto(url) {
        await this.page.goto(url);
    }

    async clickAccount() {
        await this.accountMenu.click();
    }

    async clickRegister() {
        await this.registerLink.click();
    }
}

module.exports = { HomePage };
