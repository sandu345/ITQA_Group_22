const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const assert = require('assert');
const { urls, credentials, selectors } = require('./consts');

let browser;
let page;

Given('I open the login page for admin navigation', { timeout: 30000 }, async () => {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto(urls.login, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector(selectors.usernameInput);
});

When('I enter username {string} and password {string} for admin navigation', async (username, password) => {
    await page.fill(selectors.usernameInput, username);
    await page.fill(selectors.passwordInput, password);
});

When('I click the login button for admin navigation', async () => {
    await page.click(selectors.loginButton);
    await page.waitForSelector('text=Dashboard');
});

When('I search for {string} for admin navigation', async (searchTerm) => {
    await page.waitForSelector(selectors.searchInput);
    await page.fill(selectors.searchInput, searchTerm);
    await page.press(selectors.searchInput, 'Enter');
    await page.waitForTimeout(2000);
});

When('I click on Admin menu for admin navigation', async () => {
    await page.click(selectors.adminMenu);
    await page.waitForURL(urls.admin);
});

When('I click Add button for admin navigation', async () => {
    await page.click(selectors.addButton);
    await page.waitForURL(urls.addEmployee);
});

When('I click Cancel button for admin navigation', async () => {
    await page.click(selectors.cancelButton);
    await page.waitForURL(urls.admin);
});

When('I click profile button for admin navigation', async () => {
    await page.click(selectors.profileButton);
});

When('I click logout for admin navigation', async () => {
    await page.click(selectors.logoutButton);
    await page.waitForTimeout(2000); // Add delay to ensure logout completes
});

Then('I should be redirected to login page for admin navigation', async () => {
    await page.waitForTimeout(2000); // Extra wait to ensure page loads
    await page.waitForURL(urls.login);
    const loginFormVisible = await page.isVisible('form');
    assert.strictEqual(loginFormVisible, true, 'Login form should be visible');
    await browser.close();
});