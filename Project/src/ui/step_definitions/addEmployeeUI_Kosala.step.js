// const { Given, When, Then } = require('@cucumber/cucumber');
// const { chromium } = require('playwright');
// const assert = require('assert');

// let browser;
// let page;

// // Selectors object for better maintenance
// const selectors = {
//     usernameInput: 'xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[1]/div/div[2]/input',
//     passwordInput: 'xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[2]/div/div[2]/input',
//     loginButton: 'xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[3]/button',
//     pimModule: 'xpath=//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/ul/li[2]/a',
//     addEmployeeForm: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div[2]',
//     saveButton: 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[2]/button[2]',
//     successMessage: '.oxd-text.oxd-text--toast-message.oxd-toast-content-text'
// };

// Given('I open the login page for add employee', { timeout: 30000 }, async () => {
//     browser = await chromium.launch({ headless: false });
//     const context = await browser.newContext();
//     page = await context.newPage();
//     await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', {
//         waitUntil: 'domcontentloaded'
//     });
//     await page.waitForSelector(selectors.usernameInput);
// });

// When('I enter username {string} and password {string} for add employee', async (username, password) => {
//     await page.fill(selectors.usernameInput, username);
//     await page.fill(selectors.passwordInput, password);
// });

// When('I click the login button for add employee', async () => {
//     await page.click(selectors.loginButton);
//     await page.waitForSelector('text=Dashboard');
// });

// When('I navigate to PIM module', async () => {
//     await page.click(selectors.pimModule);
//     await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
//     await page.waitForLoadState('networkidle');
// });

// When('I click on Add Employee', async () => {
//     await page.click('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[1]/button');
//     await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee');
// });

// When('I fill in the required employee details', async () => {
//     await page.waitForSelector(selectors.addEmployeeForm);
//     await page.fill('input[name="firstName"]', 'John');
//     await page.fill('input[name="lastName"]', 'Doe');
// });

// When('I click the save button for add employee', async () => {
//     await page.click(selectors.saveButton);
// });

// Then('the employee should be successfully added', { timeout: 30000 }, async () => {
//     await page.waitForSelector(selectors.successMessage);
//     const successMessage = await page.isVisible(selectors.successMessage);
//     assert.strictEqual(successMessage, true, 'Success message not visible after saving employee');
//     await browser.close();
// });