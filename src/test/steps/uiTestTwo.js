// const { Given, When, Then } = require('@cucumber/cucumber');
// const { chromium } = require('playwright');
// const assert = require('assert');

// let browser;
// let page;

// Given('I open the login page', { timeout: 30000 }, async () => {
//     browser = await chromium.launch({ headless: false }); // Debugging mode
//     const context = await browser.newContext();
//     page = await context.newPage();
//     await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { waitUntil: 'domcontentloaded' });
//     await page.waitForSelector('xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[1]/div/div[2]/input');
// });

// When('I enter username {string} and password {string}', async (username, password) => {
//     await page.fill('xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[1]/div/div[2]/input', username);
//     await page.fill('xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[2]/div/div[2]/input', password);
// });

// When('I click the login button', async () => {
//     await page.click('xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[3]/button');
//     await page.waitForSelector('text=Dashboard'); // Ensure the dashboard is loaded
// });

// When('I navigate to the dashboard', async () => {
//     await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index', { waitUntil: 'domcontentloaded' });
//     await page.waitForSelector('text=Dashboard'); // Ensure the dashboard is visible
// });

// When('I search for {string}', async (searchTerm) => {
//     await page.waitForSelector('xpath=//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/div/div/input');
//     await page.fill('xpath=//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/div/div/input', searchTerm);
//     await page.press('xpath=//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/div/div/input', 'Enter');
//     await page.waitForTimeout(2000); // Add a 2-second delay to allow results to load
// });

// Then('I should see results related to {string}', async (searchTerm) => {
//     const searchResultVisible = await page.isVisible(`text=${searchTerm}`);
//     assert.strictEqual(searchResultVisible, true, `Search results for "${searchTerm}" not visible`);
//     await browser.close();
// });
