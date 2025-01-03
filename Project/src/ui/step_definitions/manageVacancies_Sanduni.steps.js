const { Given, When, Then, setDefaultTimeout, Before, After, setWorldConstructor } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { chromium } = require('playwright');

setDefaultTimeout(60000); // Set default timeout to 60 seconds

class CustomWorld {
   constructor() {
      this.vacancyName = '';
      this.jobTitle = '';
      this.hiringManager = '';
      this.initialCount = 0;
      this.browser = null;
      this.context = null;
      this.page = null;
   }
}

setWorldConstructor(CustomWorld);

Before(async function () {
   this.browser = await chromium.launch({ headless: false }); // Set headless to false
   this.context = await this.browser.newContext();
   this.page = await this.context.newPage();
});

After(async function () {
   if (this.browser) {
      await this.browser.close();
   }
});

Given('I am logged in as an admin user for manageVacancies', async function () {
   await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { timeout: 60000 });
   await this.page.getByPlaceholder('Username').fill('admin');
   await this.page.getByPlaceholder('Password').fill('admin123');
   await this.page.getByRole('button', { name: 'Login' }).click();
   await this.page.waitForURL('**/dashboard/index');
});

Given('I select the recruitment tab for manageVacancies', async function () {
   await this.page.locator('span.oxd-main-menu-item--name:has-text("Recruitment")').click();
});

When('I navigate to the vacancies page for manageVacancies', async function () {
   await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewJobVacancy');
   const initialCountText = await this.page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[2]/div/span').textContent();
   this.initialCount = parseInt(initialCountText.match(/\d+/)[0], 10);
});

When('I click the add button for manageVacancies', async function () {
   await this.page.locator('button:has-text("Add")').click();
   await this.page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addJobVacancy');
});

When('I enter Vacancy Name as {string} for manageVacancies', async function (vacancyName) {
   const uniqueVacancyName = `${vacancyName} ${Date.now()}`;
   this.vacancyName = uniqueVacancyName;
   const vacancyNameField = this.page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div[1]/div/div[2]/input');
   await vacancyNameField.waitFor({ state: 'visible', timeout: 60000 });
   await vacancyNameField.fill(uniqueVacancyName);
});

When('I select Job Title as {string} for manageVacancies', async function (jobTitle) {
   const dropdown = this.page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div[2]/div/div[2]/div/div/div[1]');
   this.jobTitle = jobTitle;
   await dropdown.click();
   await this.page.waitForSelector(`div[role="option"]:has-text("${jobTitle}")`, { state: 'visible', timeout: 30000 });
   await this.page.locator(`div[role="option"]:has-text("${jobTitle}")`).click();
});

When('I enter Description as {string} for manageVacancies', async function (description) {
   await this.page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[2]/div/div/div[2]/textarea').fill(description);
});

When('I enter Hiring Manager as {string} for manageVacancies', async function (hiringManager) {
   const hiringManagerInput = this.page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[3]/div[1]/div/div[2]/div/div/input');
   this.hiringManager = hiringManager;
   await hiringManagerInput.fill(hiringManager);
   await this.page.waitForSelector(`div[role="option"]:has-text("${hiringManager}")`, { state: 'visible', timeout: 30000 });
   await this.page.locator(`div[role="option"]:has-text("${hiringManager}")`).click();
});

When('I click the save button for manageVacancies', async function () {
   await this.page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[7]/button[2]').click();
});

Then('I should see the count of records increase by one for manageVacancies', async function () {
   await this.page.waitForTimeout(5000); // Wait for 5 seconds to allow the count to update
   await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewJobVacancy');
   await this.page.waitForTimeout(10000); // Wait for 10 seconds to allow the count to update
   const finalCountText = await this.page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[2]/div/span').textContent();
   const finalCount = parseInt(finalCountText.match(/\d+/)[0], 10);
   expect(finalCount).toBe(this.initialCount + 1);
});

When("I select job title {string} for manageVacancies", async function (jobTitle) {
   const dropdown = this.page.locator(
      'div.oxd-input-group:has(label:has-text("Job Title")) div.oxd-select-text-input'
   );
   await dropdown.click();
   await this.page.locator(`div[role="option"]:has-text("${jobTitle}")`).click();
});

When("I select status {string} for manageVacancies", async function (status) {
   const dropdown = this.page.locator(
      'div.oxd-input-group:has(label:has-text("Status")) div.oxd-select-text-input'
   );
   await dropdown.click();
   await this.page.locator(`div[role="option"]:has-text("${status}")`).click();
});

When("I click the search button for manageVacancies", async function () {
   await this.page.locator('button:has-text("Search")').click();
});

Then(
   "I should see the vacancies in the list or a message indicating there are no records to show for manageVacancies",
   async function () {
      const vacancies = this.page.locator(".oxd-table-card");
      const noRecordsMessage = this.page.locator("text=No Records Found");
      const recordFoundMessage = this.page.locator(
         "div.orangehrm-horizontal-padding span.oxd-text--span"
      );

      const isVacanciesVisible = await vacancies.isVisible();
      const isNoRecordsMessageVisible = await noRecordsMessage.isVisible();
      const recordFoundText = await recordFoundMessage.textContent();
      const isRecordFoundMessageVisible =
         recordFoundText.includes("Record Found");

      expect(
         isVacanciesVisible ||
         isNoRecordsMessageVisible ||
         isRecordFoundMessageVisible
      ).toBeTruthy();
   }
);
