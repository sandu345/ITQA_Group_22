const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');

setDefaultTimeout(60000); // Set default timeout to 60 seconds

let browser;
let page;

Before(async function () {
    browser = await chromium.launch({ headless: true }); // Set headless to true
    const context = await browser.newContext();
    page = await context.newPage();
    this.page = page;
});

After(async function () {
    if (browser) {
        await browser.close();  // Ensure the browser is closed after each scenario
        browser = null; // Reset the browser variable
    }
});

Given('I am logged in as an admin user for applyLeave', async function () {
   await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
   await this.page.getByPlaceholder('Username').fill('admin');
   await this.page.getByPlaceholder('Password').fill('admin123');
   await this.page.getByRole('button', { name: 'Login' }).click();
   await this.page.waitForURL('**/dashboard/index');
});

When('I navigate to the leave application page for applyLeave', async function () {
   await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList');
});

When('I enter from date {string} for applyLeave', async function (fromDate) {
   const fromDateInput = this.page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[1]/div/div[2]/div/div/input');
   await fromDateInput.waitFor({ state: 'visible', timeout: 30000 });
   await fromDateInput.fill(fromDate);
});

When('I enter to date {string} for applyLeave', async function (toDate) {
   const toDateInput = this.page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[2]/div/div[2]/div/div/input');
   await toDateInput.waitFor({ state: 'visible', timeout: 30000 });
   await toDateInput.fill(toDate);
});

When('I select leave type {string} for applyLeave', async function (leaveType) {
   const dropdown = this.page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[3]/div/div[2]/div/div[1]/div[1]');
   await dropdown.click();
   await this.page.locator(`div[role="option"]:has-text("${leaveType}")`).click();
});

When('I click the leave search button for applyLeave', async function () {
   await this.page.locator('button:has-text("Search")').click();
});

Then('I should see the leave requests in the list or a message indicating there are no records to show for applyLeave', async function () {
   const leaveRequests = this.page.locator('.oxd-table-card');
   const noRecordsMessage = this.page.locator('span.oxd-text--span:has-text("No Records Found")');
   const recordFoundMessage = this.page.locator('span:has-text("Record Found"), span:has-text("Records Found")');

   const isLeaveRequestsVisible = await leaveRequests.isVisible();
   const isNoRecordsMessageVisible = await noRecordsMessage.isVisible();
   const isRecordFoundMessageVisible = await recordFoundMessage.isVisible();

   if (!isLeaveRequestsVisible && !isNoRecordsMessageVisible && !isRecordFoundMessageVisible) {
      console.error('Failure: No leave requests or messages found.');
   }

   expect(isLeaveRequestsVisible || isNoRecordsMessageVisible || isRecordFoundMessageVisible).toBeTruthy();
});

When('I navigate to the define leave period page for applyLeave', async function () {
   await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/leave/defineLeavePeriod');
});

When('I select start month {string} for applyLeave', async function (startMonth) {
   const dropdown = this.page.locator('div.oxd-input-group:has(label:has-text("Start Month")) div.oxd-select-text-input');
   await dropdown.click();
   await this.page.locator(`div[role="option"]:has-text("${startMonth}")`).click();
});

When('I select start date {string} for applyLeave', async function (startDate) {
   const dropdown = this.page.locator('div.oxd-input-group:has(label:has-text("Start Date")) div.oxd-select-text-input');
   await dropdown.click();
   await this.page.locator(`div[role="option"]:has-text("${startDate}")`).click();
});

When('I click the save button for applyLeave', async function () {
   await this.page.locator('button:has-text("Save")').click();
});

Then('I should see the end date {string} for applyLeave', async function (endDate) {
   const endDateElement = this.page.locator('div.oxd-input-group:has(label:has-text("End Date")) p.oxd-text--subtitle-2.orangehrm-leave-period');
   const endDateText = await endDateElement.textContent();
   expect(endDateText).toBe(endDate);
});

Then('I should see the current leave period {string} for applyLeave', async function (currentLeavePeriod) {
   const currentLeavePeriodElement = this.page.locator('div.oxd-input-group:has(label:has-text("Current Leave Period")) p.oxd-text--subtitle-2.orangehrm-leave-period');
   const currentLeavePeriodText = await currentLeavePeriodElement.textContent();
   expect(currentLeavePeriodText).toBe(currentLeavePeriod);
});