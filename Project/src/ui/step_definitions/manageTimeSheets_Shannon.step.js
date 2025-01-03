const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');

setDefaultTimeout(60000); // Set default timeout to 60 seconds

let browser;
let page;

const selectors = {
    usernameInput: 'xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[1]/div/div[2]/input',
    passwordInput: 'xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[2]/div/div[2]/input',
    loginButton: 'xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[3]/button',
    timeModule: 'xpath=//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/ul/li[4]/a/span',
    timesheetSearchBar: '//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/form/div[1]/div/div/div/div[2]/div/div/input',
    timesheetViewButton: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/form/div[2]/button',
    pendingActionViewButton: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[3]/div/div[2]/div[1]/div/div[3]/div/button',
    timesheetDetails: '//*[@id="app"]/div[1]/div[2]/div[2]/div',
    recordsMessage: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[2]/div/span',
};

Before(async function () {
    const isCI = process.env.CI === 'true';
    browser = await chromium.launch({ headless: isCI });
    const context = await browser.newContext();
    page = await context.newPage();
    this.page = page;
});

After(async function () {
    if (browser && browser.isConnected()) {
        await browser.close();
    }
});

Given('I open the login page for timesheet management', async function () {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { waitUntil: 'domcontentloaded' });
    await this.page.waitForSelector('xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[1]/div/div[2]/input');
});

When('I enter username {string} and password {string} for timesheet management', async function (username, password) {
    await this.page.fill('xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[1]/div/div[2]/input', username);
    await this.page.fill('xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[2]/div/div[2]/input', password);
});

When('I click the login button for timesheet management', async function () {
    await this.page.click('xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[3]/button');
    await this.page.waitForSelector('text=Dashboard');
});

When('I navigate to Time module for timesheet management', async function () {
    await this.page.click('xpath=//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/ul/li[4]/a');
    await this.page.waitForURL('**/time/viewTimeModule', { timeout: 60000 });
});

When('I search and select employee name {string} in the timesheet search bar', async function (employeeName) {
    await this.page.fill('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[2]/div/div/input', employeeName);
    await this.page.waitForSelector(`div[role="option"]:has-text("${employeeName}")`);
    await this.page.click(`div[role="option"]:has-text("${employeeName}")`);
});

When('I click the view button for the selected employee', async function () {
    await this.page.click('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[2]/button[2]');
});

Then('I should be redirected to the employee\'s timesheet page with a valid URL', async function () {
    await this.page.waitForURL('**/time/viewEmployeeTimesheet');
    const url = this.page.url();
    expect(url).toContain('/time/viewEmployeeTimesheet');
});

When('I click the "View" button in the "Timesheets Pending Action" box', async function () {
    await this.page.click('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[2]/div[2]/div[2]/button');
});

Then('I should be redirected to the pending timesheet page with a valid URL', async function () {
    await this.page.waitForURL('**/time/viewPendingTimesheet');
    const url = this.page.url();
    expect(url).toContain('/time/viewPendingTimesheet');
});
