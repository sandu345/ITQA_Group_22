const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const assert = require('assert');

let browser;
let page;

Before(async function () {
    browser = await chromium.launch({ headless: true }); // Set headless to true
    const context = await browser.newContext();
    page = await context.newPage();
    this.page = page;
});

After(async function () {
    if (browser) {
        await browser.close();  // Ensure the browser is closed after each scenario
        browser = null; // Reset the browser variable
    }
});

Given('I open the login page for admin navigation', { timeout: 30000 }, async () => {
    await browser.newContext();
    page = await browser.newPage();
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[1]/div/div[2]/input');
});

When('I enter username {string} and password {string} for admin navigation', async (username, password) => {
    await page.fill('xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[1]/div/div[2]/input', username);
    await page.fill('xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[2]/div/div[2]/input', password);
});

When('I click the login button for admin navigation', async () => {
    await page.click('xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[3]/button');
    await page.waitForSelector('text=Dashboard');
});

When('I search for {string} for admin navigation', async (searchTerm) => {
    await page.waitForSelector('xpath=//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/div/div/input');
    await page.fill('xpath=//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/div/div/input', searchTerm);
    await page.press('xpath=//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/div/div/input', 'Enter');
    await page.waitForTimeout(2000);
});

When('I click on Admin menu for admin navigation', async () => {
    await page.click('xpath=//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/ul/li[1]/a');
    await page.waitForURL('**/admin/viewSystemUsers');
});

When('I click Add button for admin navigation', async () => {
    await page.click('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[1]/button');
    await page.waitForURL('**/admin/saveSystemUser');
});

When('I click Cancel button for admin navigation', async () => {
    await page.click('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[3]/button[1]');
    await page.waitForURL('**/admin/viewSystemUsers');
});

When('I click profile button for admin navigation', async () => {
    await page.click('xpath=//*[@id="app"]/div[1]/div[1]/header/div[1]/div[3]/ul/li/span/p');
});

When('I click logout for admin navigation', async () => {
    await page.click('xpath=//*[@id="app"]/div[1]/div[1]/header/div[1]/div[3]/ul/li/ul/li[4]/a');
    await page.waitForTimeout(2000); // Add delay to ensure logout completes
});

Then('I should be redirected to login page for admin navigation', async () => {
    await page.waitForTimeout(2000); // Extra wait to ensure page loads
    await page.waitForURL('**/auth/login');
    const loginFormVisible = await page.isVisible('form');
    assert.strictEqual(loginFormVisible, true, 'Login form should be visible');
});