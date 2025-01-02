const { Given, When, Then, setDefaultTimeout, Before, setWorldConstructor } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { chromium } = require('playwright');

setDefaultTimeout(60000); // Set default timeout to 60 seconds

class CustomWorld {
    constructor() {
        this.vacancyName = '';
        this.initialCount = 0;
    }
}

setWorldConstructor(CustomWorld);

Before(async function() {
    this.browser = await chromium.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    console.log('Browser launched and context created');
});

Given('I am logged in as an admin user', async function() {
    console.log('Navigating to login page');
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { timeout: 60000 });
    await this.page.getByPlaceholder('Username').fill('admin');
    await this.page.getByPlaceholder('Password').fill('admin123');
    await this.page.getByRole('button', { name: 'Login' }).click();
    await this.page.waitForURL('**/dashboard/index');
    console.log('Logged in as admin user');
});

Given('I select the recruitment tab', async function() {
    console.log('Selecting the recruitment tab');
    await this.page.locator('span.oxd-main-menu-item--name:has-text("Recruitment")').click();
});

When('I navigate to the vacancies page', async function() {
    console.log('Navigating to the vacancies page');
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewJobVacancy');
    const initialCountText = await this.page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[2]/div/span').textContent();
    console.log(`Initial Count: ${initialCountText}`);
    this.initialCount = parseInt(initialCountText.match(/\d+/)[0], 10);
    console.log(`Initial Count: ${this.initialCount}`);
});

When('I click the add button', async function() {
    console.log('Clicking the add button');
    await this.page.locator('button:has-text("Add")').click();
    await this.page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addJobVacancy');
    console.log('Navigated to add job vacancy page');
});

When('I enter Vacancy Name as {string}', async function(vacancyName) {
    console.log(`Entering Vacancy Name: ${vacancyName}`);
    this.vacancyName = vacancyName;
    const vacancyNameField = this.page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div[1]/div/div[2]/input');
    await vacancyNameField.waitFor({ state: 'visible', timeout: 60000 });
    await vacancyNameField.fill(vacancyName);
});

When('I select Job Title as {string}', async function(jobTitle) {
    console.log(`Selecting Job Title: ${jobTitle}`);
    const dropdown = this.page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div[2]/div/div[2]/div/div/div[1]');
    await dropdown.click();
    await this.page.locator(`div[role="option"]:has-text("${jobTitle}")`).click();
});

When('I enter Description as {string}', async function(description) {
    console.log(`Entering Description: ${description}`);
    await this.page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div/div[2]/textarea').fill(description);
});

When('I enter Hiring Manager as {string}', async function(hiringManager) {
    console.log(`Entering Hiring Manager: ${hiringManager}`);
    await this.page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[3]/div[1]/div/div[2]/div/div/input').fill(hiringManager);
});

When('I enter Number of Positions as {string}', async function(numberOfPositions) {
    console.log(`Entering Number of Positions: ${numberOfPositions}`);
    await this.page.locator('label:has-text("Number of Positions") + div input').fill(numberOfPositions);
});

When('I click the save button', async function() {
    console.log('Clicking the save button');
    await this.page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[7]/button[2]').click();
});

Then('I should see the count of records increase by one', async function() {
    console.log('Verifying the count of records increase');
    await this.page.waitForTimeout(5000); // Wait for 5 seconds to allow the count to update
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewJobVacancy');
    await this.page.waitForTimeout(5000); // Wait for 5 seconds to allow the count to update
    const finalCountText = await this.page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[2]/div/span').textContent();
    const finalCount = parseInt(finalCountText.match(/\d+/)[0], 10);
    console.log(`Final Count: ${finalCount}`);
    expect(finalCount).toBe(this.initialCount + 1);
    console.log('Count of records increase verified');
});
