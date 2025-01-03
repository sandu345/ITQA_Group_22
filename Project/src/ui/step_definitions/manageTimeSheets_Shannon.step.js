const { Given, When, Then, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const assert = require('assert');
const { urls, credentials, selectors } = require('./consts');

let browser;
let page;

Given('I open the login page for timesheet management', { timeout: 30000 }, async () => {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto(urls.login, {
        waitUntil: 'domcontentloaded',
    });
    await page.waitForSelector(selectors.usernameInput);
});

When('I enter username {string} and password {string} for timesheet management', async (username, password) => {
    await page.fill(selectors.usernameInput, username);
    await page.fill(selectors.passwordInput, password);
});

When('I click the login button for timesheet management', async () => {
    await page.click(selectors.loginButton);
});

When('I navigate to Time module for timesheet management', async () => {
    await page.waitForSelector(selectors.timeModule);
    await page.click(selectors.timeModule);
});

When('I search and select employee name {string} in the timesheet search bar', async (employeeName) => {
    await page.waitForSelector(selectors.timesheetSearchBar, { timeout: 10000 });
    await page.fill(selectors.timesheetSearchBar, employeeName);

    const suggestionSelector = `xpath=//*[@class="oxd-autocomplete-dropdown --positon-bottom"]//span[contains(text(), "${employeeName}")]`;
    await page.waitForSelector(suggestionSelector, { timeout: 10000 });
    await page.click(suggestionSelector);
});

When('I click the view button for the selected employee', async () => {
    await page.waitForSelector(selectors.timesheetViewButton, { timeout: 10000 });
    await page.click(selectors.timesheetViewButton);
});

Then('I should be redirected to the employee\'s timesheet page with a valid URL', { timeout: 20000 }, async () => {
    await page.waitForTimeout(10000); // Wait for 10 seconds to allow the page to load
    const url = page.url();
    console.log(url);
    assert(url.match(/\/time\/viewTimesheet\/employeeId\/\d+/), 'Expected URL not found');
});

When('I click the "View" button in the "Timesheets Pending Action" box', async () => {
    await page.waitForSelector(selectors.pendingActionViewButton, { timeout: 10000 });
    await page.click(selectors.pendingActionViewButton);
});

Then('I should be redirected to the pending timesheet page with a valid URL', { timeout: 20000 }, async () => {
    await page.waitForTimeout(10000); // Wait for 10 seconds to allow the page to load
    const url = page.url();
    console.log(url);
    assert(url.match(/\/time\/viewTimesheet\/employeeId\/\d+\?startDate=\d{4}-\d{2}-\d{2}/), 'Expected URL not found');
});

After(async () => {
    if (browser) {
        await browser.close();  // Ensure the browser is closed after each scenario
    }
});
