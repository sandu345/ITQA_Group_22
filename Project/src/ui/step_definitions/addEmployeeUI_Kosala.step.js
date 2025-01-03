const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');

setDefaultTimeout(60000); // Set default timeout to 60 seconds

let browser;
let page;

// Selectors object for better maintenance
const selectors = {
    usernameInput: 'xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[1]/div/div[2]/input',
    passwordInput: 'xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[2]/div/div[2]/input',
    loginButton: 'xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[3]/button',
    pimModule: 'xpath=//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/ul/li[2]/a',
    addEmployeeForm: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div[2]',
    saveButton: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[2]/button[2]',
    successMessage: '.oxd-text.oxd-text--toast-message.oxd-toast-content-text'
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

Given('I open the login page for add employee', async function () {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { waitUntil: 'domcontentloaded' });
    await this.page.waitForSelector(selectors.usernameInput);
});

When('I enter username {string} and password {string} for add employee', async function (username, password) {
    await this.page.fill(selectors.usernameInput, username);
    await this.page.fill(selectors.passwordInput, password);
});

When('I click the login button for add employee', async function () {
    await this.page.click(selectors.loginButton);
    await this.page.waitForSelector('text=Dashboard');
});

When('I navigate to PIM module', async function () {
    await this.page.click(selectors.pimModule);
    await this.page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
    await this.page.waitForLoadState('networkidle');
});

When('I click on Add Employee', async function () {
    await this.page.click('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[1]/button');
    await this.page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee');
});

When('I fill in the required employee details', async function () {
    await this.page.waitForSelector(selectors.addEmployeeForm);
    await this.page.fill('input[name="firstName"]', 'John');
    await this.page.fill('input[name="lastName"]', 'Doe');
});

When('I click the save button for add employee', async function () {
    await this.page.click(selectors.saveButton);
});

Then('the employee should be successfully added', async function () {
    await this.page.waitForSelector(selectors.successMessage);
    const successMessage = await this.page.locator(selectors.successMessage).textContent();
    expect(successMessage).toBe('Successfully Saved');
});