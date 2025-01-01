// const { Given, When, Then } = require('@cucumber/cucumber');
// const { chromium } = require('playwright');
// const assert = require('assert');

// let browser;
// let page;

// Given('I open the login page', { timeout: 30000 }, async () => {
//     browser = await chromium.launch({ headless: false });
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
// });

// Then('I should be redirected to the dashboard', async () => {
//     await page.waitForSelector('text=Dashboard');
//     const dashboardVisible = await page.isVisible('text=Dashboard');
//     assert.strictEqual(dashboardVisible, true, 'Dashboard not visible after login');
// });

// When('I navigate to PIM page', async () => {
//     await page.click('xpath=//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/ul/li[2]/a');
//     await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
//     // Wait for the page to be fully loaded
//     await page.waitForSelector('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[3]/div/div[2]/div/div/div[1]', { state: 'visible' });
// });

// When('I select Full-Time Permanent from employment status', async () => {
//     // Wait for dropdown to be interactive
//     await page.waitForTimeout(1000);
    
//     // Click to open the dropdown
//     const dropdownXPath = '//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[3]/div/div[2]/div/div/div[1]';
//     await page.click(`xpath=${dropdownXPath}`);
    
//     // Wait for dropdown options to appear
//     await page.waitForTimeout(1000);
    
//     // Click Full-Time Permanent option
//     await page.click('text=Full-Time Permanent', { timeout: 5000 });
    
//     // Wait for selection to be processed
//     await page.waitForTimeout(500);
// });

// When('I click the search button', async () => {
//     const searchButtonXPath = '//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[2]/button[2]';
//     await page.click(`xpath=${searchButtonXPath}`);
// });

// Then('I should see the filtered results for Full-Time Permanent employees', async () => {
//     // Wait for results to load
//     await page.waitForTimeout(2000);
    
//     try {
//         // Check if there are any results
//         const rows = await page.$$('.oxd-table-row');
//         assert.ok(rows.length > 1, 'No search results found'); // First row is header
        
//         // Optional: Verify some results contain "Full-Time Permanent"
//         const statusCells = await page.$$('text=Full-Time Permanent');
//         assert.ok(statusCells.length > 0, 'No Full-Time Permanent employees found in results');
//     } finally {
//         await browser.close();
//     }
// });