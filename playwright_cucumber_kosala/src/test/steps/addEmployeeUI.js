import { Given, When, Then } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import assert from 'assert';

let browser;
let page;

// Selectors object for better maintenance
const selectors = {
    usernameInput: 'xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[1]/div/div[2]/input',
    passwordInput: 'xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[2]/div/div[2]/input',
    loginButton: 'xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[3]/button',
    pimModule: 'xpath=//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/ul/li[2]/a',
    addEmployeeForm: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div[2]',
    saveButton: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[2]/button[2]'
};

Given('I open the login page', { timeout: 30000 }, async () => {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', {
        waitUntil: 'domcontentloaded'
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

When('I navigate to PIM module', async () => {
    await page.waitForSelector(selectors.pimModule);
    await page.click(selectors.pimModule);
});

When('I click on Add Employee', async () => {
    // Wait for page to load after navigation
    await page.waitForLoadState('networkidle');
    // Navigate to Add Employee page
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee');
});

When('I fill in the required employee details', async () => {
    await page.waitForSelector(selectors.addEmployeeForm);
    // Fill in the required fields
    // Note: Add specific field selectors and values based on your requirements
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
});

When('I click the save button', async () => {
    await page.waitForSelector(selectors.saveButton);
    await page.click(selectors.saveButton);
});

Then('the employee should be successfully added', { timeout: 30000 }, async () => {
    // Wait for success message or verification element
    await page.waitForSelector('.oxd-text.oxd-text--toast-message.oxd-toast-content-text');
    const successMessage = await page.isVisible('.oxd-text.oxd-text--toast-message.oxd-toast-content-text');
    assert.strictEqual(successMessage, true, 'Success message not visible after saving employee');
    await browser.close();
});