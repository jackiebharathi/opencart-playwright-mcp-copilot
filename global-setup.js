const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

async function globalSetup() {
    // Create logs directory if it doesn't exist
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir);
    }

    // You can add more global setup here, like:
    // - Setting up test data
    // - Setting up global state
    // - Running any required scripts before tests
}

module.exports = globalSetup;
