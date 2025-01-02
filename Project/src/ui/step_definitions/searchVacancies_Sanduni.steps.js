// const {
//   Given,
//   When,
//   Then,
//   setDefaultTimeout,
//   Before,
// } = require("@cucumber/cucumber");
// const { expect } = require("@playwright/test");
// const { chromium } = require("playwright");

// setDefaultTimeout(60000); // Set default timeout to 60 seconds

// Before(async function () {
//   this.browser = await chromium.launch();
//   this.context = await this.browser.newContext();
//   this.page = await this.context.newPage();
// });

// Given("I am logged in as an admin user", async function () {
//   await this.page.goto(
//     "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
//   );
//   await this.page.getByPlaceholder("Username").fill("admin");
//   await this.page.getByPlaceholder("Password").fill("admin123");
//   await this.page.getByRole("button", { name: "Login" }).click();
//   await this.page.waitForURL("**/dashboard/index");
// });

// Given("I select the recruitment tab", async function () {
//   await this.page
//     .locator('span.oxd-main-menu-item--name:has-text("Recruitment")')
//     .click();
// });

// When("I navigate to the vacancies page", async function () {
//   await this.page.goto(
//     "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewJobVacancy"
//   );
// });

// When("I select job title {string}", async function (jobTitle) {
//   const dropdown = this.page.locator(
//     'div.oxd-input-group:has(label:has-text("Job Title")) div.oxd-select-text-input'
//   );
//   await dropdown.click();
//   await this.page.locator(`div[role="option"]:has-text("${jobTitle}")`).click();
// });

// When("I select vacancy {string}", async function (vacancy) {
//   const dropdown = this.page.locator(
//     'div.oxd-input-group:has(label:has-text("Vacancy")) div.oxd-select-text-input'
//   );
//   await dropdown.click();
//   await this.page.locator(`div[role="option"]:has-text("${vacancy}")`).click();
// });

// When("I select hiring manager {string}", async function (hiringManager) {
//   const dropdown = this.page.locator(
//     'div.oxd-input-group:has(label:has-text("Hiring Manager")) div.oxd-select-text-input'
//   );
//   await dropdown.click();
//   const option = this.page.locator(
//     `div[role="option"]:has-text("${hiringManager}")`
//   );
//   await option.waitFor({ state: "visible", timeout: 60000 });
//   await option.click();
// });

// When("I select status {string}", async function (status) {
//   const dropdown = this.page.locator(
//     'div.oxd-input-group:has(label:has-text("Status")) div.oxd-select-text-input'
//   );
//   await dropdown.click();
//   await this.page.locator(`div[role="option"]:has-text("${status}")`).click();
// });

// When("I click the search button", async function () {
//   await this.page.locator('button:has-text("Search")').click();
// });

// Then(
//   "I should see the vacancies in the list or a message indicating there are no records to show",
//   async function () {
//     const vacancies = this.page.locator(".oxd-table-card");
//     const noRecordsMessage = this.page.locator("text=No Records Found");
//     const recordFoundMessage = this.page.locator(
//       "div.orangehrm-horizontal-padding span.oxd-text--span"
//     );

//     const isVacanciesVisible = await vacancies.isVisible();
//     const isNoRecordsMessageVisible = await noRecordsMessage.isVisible();
//     const recordFoundText = await recordFoundMessage.textContent();
//     const isRecordFoundMessageVisible =
//       recordFoundText.includes("Record Found");

//     expect(
//       isVacanciesVisible ||
//         isNoRecordsMessageVisible ||
//         isRecordFoundMessageVisible
//     ).toBeTruthy();
//   }
// );
