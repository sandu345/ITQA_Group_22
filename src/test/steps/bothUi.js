

const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const assert = require('assert');

let browser;
let page;

Given('I open the login page', { timeout: 30000 }, async () => {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.waitForSelector('[name="username"]');
});

When('I enter username {string} and password {string}', async (username, password) => {
    await page.locator('[name="username"]').fill(username);
    await page.locator('[name="password"]').fill(password);
});

When('I click the login button', async () => {
    await page.locator('button[type="submit"]').click();
    await page.waitForSelector('.oxd-text--h6');
});

When('I search for {string}', async (searchTerm) => {
    await page.locator('.oxd-main-menu-search input').fill(searchTerm);
    await page.locator('.oxd-main-menu-search input').press('Enter');
    await page.waitForTimeout(2000);
});

When('I click on Admin menu', async () => {
    await page.locator('.oxd-main-menu-item').first().click();
    await page.waitForURL('**/admin/viewSystemUsers');
});

When('I click Add button', { timeout: 15000 }, async () => {
    // Wait for page load and button to be visible
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.oxd-button--secondary', { state: 'visible', timeout: 10000 });
    
    // Click the Add button more precisely
    await page.locator('.oxd-button--secondary').filter({ hasText: 'Add' }).click();
    
    // Wait for navigation
    await page.waitForURL('**/admin/saveSystemUser', { timeout: 10000 });
});

When('I click Cancel button', { timeout: 15000 }, async () => {
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('button:has-text("Cancel")', { state: 'visible' });
    await page.locator('button:has-text("Cancel")').click();
    await page.waitForURL('**/admin/viewSystemUsers');
});

When('I click profile button', { timeout: 10000 }, async () => {
    await page.waitForSelector('.oxd-userdropdown-tab');
    await page.locator('.oxd-userdropdown-tab').click();
});

When('I click logout', async () => {
    await page.locator('text=Logout').click();
    await page.waitForTimeout(2000);
});

Then('I should be redirected to login page', async () => {
    await page.waitForTimeout(2000);
    await page.waitForURL('**/auth/login');
    const loginFormVisible = await page.locator('form').isVisible();
    assert.strictEqual(loginFormVisible, true);
    await browser.close();
});