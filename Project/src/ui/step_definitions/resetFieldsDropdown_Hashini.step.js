const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');

setDefaultTimeout(60000); // Set default timeout to 60 seconds

let browser;
let page;

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

Given('I open the login page', { timeout: 30000 }, async () => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { waitUntil: 'networkidle' });
    await page.waitForSelector('xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[1]/div/div[2]/input');
});

Given('I open the login page for reset fields', async function () {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { waitUntil: 'domcontentloaded' });
    await this.page.waitForSelector('xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[1]/div/div[2]/input');
});

When('I enter username {string} and password {string}', async (username, password) => {
    await page.fill('xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[1]/div/div[2]/input', username);
    await page.fill('xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[2]/div/div[2]/input', password);
});

When('I enter username {string} and password {string} for reset fields', async function (username, password) {
    await this.page.fill('xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[1]/div/div[2]/input', username);
    await this.page.fill('xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[2]/div/div[2]/input', password);
});

When('I click the login button', async () => {
    await page.click('xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[3]/button');
});

When('I click the login button for reset fields', async function () {
    await this.page.click('xpath=//*[@id="app"]/div[1]/div/div[1]/div/div[2]/div[2]/form/div[3]/button');
    await this.page.waitForSelector('text=Dashboard');
});

Then('I should be redirected to the dashboard', async () => {
    await page.waitForSelector('text=Dashboard', { state: 'visible', timeout: 10000 });
    const dashboardVisible = await page.isVisible('text=Dashboard');
    assert.strictEqual(dashboardVisible, true, 'Dashboard not visible after login');
});

Then('I should be redirected to the dashboard for reset fields', async function () {
    await this.page.waitForURL('**/dashboard/index');
    const url = this.page.url();
    expect(url).toContain('/dashboard/index');
});

When('I navigate to PIM page', async () => {
    await page.click('xpath=//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/ul/li[2]/a');
    await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
    await page.waitForLoadState('networkidle');
});

When('I navigate to PIM page for reset fields', async function () {
    await this.page.click('xpath=//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/ul/li[2]/a');
    await this.page.waitForURL('**/pim/viewEmployeeList');
});

When('I select Full-Time Permanent from employment status', async () => {
    await page.waitForSelector('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[3]/div/div[2]/div/div/div[1]', { state: 'visible', timeout: 10000 });
    await page.click('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[3]/div/div[2]/div/div/div[1]');
    await page.click('text=Full-Time Permanent', { timeout: 10000 });
    await page.waitForTimeout(1000);
});

When('I select Full-Time Permanent from employment status for reset fields', async function () {
    const dropdown = this.page.locator('div.oxd-input-group:has(label:has-text("Employment Status")) div.oxd-select-text-input');
    await dropdown.click();
    await this.page.locator('div[role="option"]:has-text("Full-Time Permanent")').click();
});

When('I click the search button', async () => {
    await page.click('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[2]/button[2]');
    await page.waitForLoadState('networkidle');
});

When('I click the PIM search button for reset fields', async function () {
    await this.page.click('button:has-text("Search")');
});

Then('I should see the filtered results for Full-Time Permanent employees', async () => {
    await page.waitForSelector('.oxd-table-row', { state: 'visible', timeout: 10000 });
    const rows = await page.$$('.oxd-table-row');
    assert.ok(rows.length > 1, 'No search results found');
});

Then('I should see the filtered results for Full-Time Permanent employees for reset fields', async function () {
    const results = this.page.locator('.oxd-table-card');
    const noRecordsMessage = this.page.locator('span.oxd-text--span:has-text("No Records Found")');
    const isResultsVisible = await results.isVisible();
    const isNoRecordsMessageVisible = await noRecordsMessage.isVisible();
    expect(isResultsVisible || isNoRecordsMessageVisible).toBeTruthy();
});

When('I enter employee name {string}', async (name) => {
    const nameInputSelector = 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[1]/div/div[2]/div/div/input';

    // Wait for the input field to be visible and enabled before interacting
    await page.waitForSelector(nameInputSelector, { visible: true, timeout: 15000 });

    // Clear the field before entering the new value
    await page.fill(nameInputSelector, '');  // Clears any existing text
    await page.type(nameInputSelector, name, { delay: 100 });  // Type the name "Nishara" with a slight delay
    await page.waitForTimeout(1000);  // Wait to ensure the text is fully entered
});

When('I enter employee name {string} for reset fields', async function (employeeName) {
    await this.page.fill('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[2]/div/div/input', employeeName);
});

When('I enter employee ID {string}', async (id) => {
    const idInputSelector = 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[2]/div/div[2]/input';

    // Wait for the input field to be visible and enabled before interacting
    await page.waitForSelector(idInputSelector, { visible: true, timeout: 15000 });

    // Clear the field before entering the new value
    await page.fill(idInputSelector, '');  // Clears any existing text
    await page.type(idInputSelector, id, { delay: 100 });  // Type the ID "456" with a slight delay
    await page.waitForTimeout(1000);  // Wait to ensure the text is fully entered
});

When('I enter employee ID {string} for reset fields', async function (employeeID) {
    await this.page.fill('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[3]/div/div/input', employeeID);
});

Then('I should see the search results', async () => {
    await page.waitForSelector('.oxd-table-row', { state: 'visible', timeout: 10000 });
    const rows = await page.$$('.oxd-table-row');
    assert.ok(rows.length > 0, 'No search results found');
});

Then('I should see the search results for reset fields', async function () {
    const results = this.page.locator('.oxd-table-card');
    const noRecordsMessage = this.page.locator('span.oxd-text--span:has-text("No Records Found")');
    const isResultsVisible = await results.isVisible();
    const isNoRecordsMessageVisible = await noRecordsMessage.isVisible();
    expect(isResultsVisible || isNoRecordsMessageVisible).toBeTruthy();
});

When('I click the reset button', async () => {
    const resetButtonSelector = 'xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[2]/button[1]';

    // Wait for the reset button to be visible and enabled before clicking
    await page.waitForSelector(resetButtonSelector, { visible: true, timeout: 15000 });

    // Click the reset button
    await page.click(resetButtonSelector);
    await page.waitForLoadState('networkidle');  // Wait for the page to stabilize after the reset
});

When('I click the reset button for reset fields', async function () {
    await this.page.click('button:has-text("Reset")');
});

Then('the search fields should be cleared', async () => {
    // Verify the fields are cleared
    const nameValue = await page.inputValue('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[1]/div/div[2]/div/div/input');
    const idValue = await page.inputValue('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[2]/div/div[2]/input');
    assert.strictEqual(nameValue, '', 'Name field is not cleared');
    assert.strictEqual(idValue, '', 'ID field is not cleared');
});

Then('the search fields should be cleared for reset fields', async function () {
    const employeeNameField = await this.page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[2]/div/div/input').inputValue();
    const employeeIDField = await this.page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div/div[3]/div/div/input').inputValue();
    expect(employeeNameField).toBe('');
    expect(employeeIDField).toBe('');
});