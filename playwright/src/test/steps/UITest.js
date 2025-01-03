import { Given, When, Then } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import assert from 'assert';

let browser;
let page;

const selectors = {
    usernameInput: 'xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[1]/div/div[2]/input',
    passwordInput: 'xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[2]/div/div[2]/input',
    loginButton: 'xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[3]/button',
    timeModule: 'xpath=//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/ul/li[4]/a/span',
    timesheetSearchBar: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/form/div[1]/div/div/div/div[2]/div/div/input',
    timesheetViewButton: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/form/div[2]/button',
    pendingActionViewButton: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[3]/div/div[2]/div[1]/div/div[3]/div/button',
    timesheetDetails: '//*[@id="app"]/div[1]/div[2]/div[2]/div',
};

Given('I open the login page', { timeout: 30000 }, async () => {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', {
        waitUntil: 'domcontentloaded',
    });
    await page.waitForSelector(selectors.usernameInput);
});

When('I enter username {string} and password {string}', async (username, password) => {
    await page.fill(selectors.usernameInput, username);
    await page.fill(selectors.passwordInput, password);
});

When('I click the login button', async () => {
    await page.click(selectors.loginButton);
});

When('I navigate to Time module', async () => {
    await page.waitForSelector(selectors.timeModule);
    await page.click(selectors.timeModule);
});

When('I search for employee {string} in the timesheet search bar', async (employeeName) => {
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

Then('I should see the timesheet details', async () => {
    await page.waitForSelector(selectors.timesheetDetails, { timeout: 10000 });
    const isVisible = await page.isVisible(selectors.timesheetDetails);
    assert.strictEqual(isVisible, true, 'Timesheet details are not visible');
});

When('I click the "View" button in the "Timesheets Pending Action" box', async () => {
    await page.waitForSelector(selectors.pendingActionViewButton, { timeout: 10000 });
    await page.click(selectors.pendingActionViewButton);
});

Then('I should see the pending timesheet details', async () => {
    await page.waitForSelector(selectors.timesheetDetails, { timeout: 10000 });
    const isVisible = await page.isVisible(selectors.timesheetDetails);
    assert.strictEqual(isVisible, true, 'Pending timesheet details not visible');
});
