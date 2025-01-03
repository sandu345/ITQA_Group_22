const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const assert = require('assert');
const { urls, credentials, selectors } = require('./consts');

let browser;
let page;

Given('I open the login page for add employee', { timeout: 30000 }, async () => {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto(urls.login, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector(selectors.usernameInput);
});

When('I enter username {string} and password {string} for add employee', async (username, password) => {
    await page.fill(selectors.usernameInput, username);
    await page.fill(selectors.passwordInput, password);
});

When('I click the login button for add employee', async () => {
    await page.click(selectors.loginButton);
    await page.waitForSelector('text=Dashboard');
});

When('I navigate to PIM module', async () => {
    await page.click(selectors.pimModule);
    await page.waitForURL(urls.pim);
    await page.waitForLoadState('networkidle');
});

When('I click on Add Employee', async () => {
    await page.click(selectors.addEmployeeButton);
    await page.waitForURL(urls.addEmployee);
});

When('I fill in the required employee details', async () => {
    await page.waitForSelector(selectors.addEmployeeForm);
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
});

When('I click the save button for add employee', async () => {
    await page.click(selectors.saveButton);
});

Then('the employee should be successfully added', { timeout: 30000 }, async () => {
    await page.waitForSelector(selectors.successMessage);
    const successMessage = await page.isVisible(selectors.successMessage);
    assert.strictEqual(successMessage, true, 'Success message not visible after saving employee');
    await browser.close();
});