const base = require('@playwright/test');
const { LoginPage } = require('../PageObjects/LoginPage');
const logger = require('../utils/logger');

// Extend base test with custom fixtures
exports.test = base.test.extend({
    // Custom fixture for logged-in state
    loggedInPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await page.goto(process.env.BASE_URL + '/index.php?route=account/login');
        await loginPage.login('valid@email.com', 'validpass'); // Replace with valid credentials
        await use(page);
    },

    // Custom fixture for page with logger
    pageWithLogger: async ({ page }, use) => {
        // Add logger to page
        page.log = (message) => logger.info(`[Page ${page.url()}] ${message}`);
        
        // Log all console messages
        page.on('console', msg => {
            const type = msg.type();
            const text = msg.text();
            if (type === 'error') {
                logger.error(`Browser console error: ${text}`);
            } else {
                logger.debug(`Browser console [${type}]: ${text}`);
            }
        });

        await use(page);
    },

    // Fixture for test isolation
    isolatedPage: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await use(page);
        await context.close();
    }
});

exports.expect = base.expect;
