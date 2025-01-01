const { Given, When, Then, setDefaultTimeout, Before } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { chromium } = require('playwright');

setDefaultTimeout(60000); // Set default timeout to 60 seconds

Before(async function() {
    this.browser = await chromium.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
});

Given('I am logged in as an admin user', async function() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await this.page.getByPlaceholder('Username').fill('admin');
    await this.page.getByPlaceholder('Password').fill('admin123');
    await this.page.getByRole('button', { name: 'Login' }).click();
    await this.page.waitForURL('**/dashboard/index');
});

Given('I select the recruitment tab', async function() {
    await this.page.locator('span.oxd-main-menu-item--name:has-text("Recruitment")').click();
});

When('I navigate to the vacancies page', async function() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewJobVacancy');
});

When('I click the add button', async function() {
    await this.page.locator('button:has-text("Add")').click();
});

When('I enter Vacancy Name as {string}', async function(vacancyName) {
    const vacancyNameField = this.page.locator('label:has-text("Vacancy Name") + div input');
    await vacancyNameField.waitFor({ state: 'visible', timeout: 60000 });
    await vacancyNameField.fill(vacancyName);
});

When('I select Job Title as {string}', async function(jobTitle) {
    const dropdown = this.page.locator('label:has-text("Job Title") + div div.oxd-select-text-input');
    await dropdown.click();
    await this.page.locator(`div[role="option"]:has-text("${jobTitle}")`).click();
});

When('I enter Description as {string}', async function(description) {
    await this.page.locator('label:has-text("Description") + div textarea').fill(description);
});

When('I enter Hiring Manager as {string}', async function(hiringManager) {
    await this.page.locator('label:has-text("Hiring Manager") + div input').fill(hiringManager);
});

When('I enter Number of Positions as {string}', async function(numberOfPositions) {
    await this.page.locator('label:has-text("Number of Positions") + div input').fill(numberOfPositions);
});

When('I click the save button', async function() {
    await this.page.locator('button.oxd-button--secondary:has-text("Save")').click();
});

Then('I should see the new vacancy in the list', async function() {
    const vacancyName = await this.page.locator('label:has-text("Vacancy Name") + div input').inputValue();
    const vacancyInList = this.page.locator(`.oxd-table-card:has-text("${vacancyName}")`);
    expect(await vacancyInList.isVisible()).toBeTruthy();
});
