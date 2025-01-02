const { Given, When, Then, Before, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');

setDefaultTimeout(60000); // Set default timeout to 60 seconds

let browser;
let page;

Before(async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    this.page = page;
});

Given('I am logged in as an admin user', async function () {
   await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
   await this.page.getByPlaceholder('Username').fill('admin');
   await this.page.getByPlaceholder('Password').fill('admin123');
   await this.page.getByRole('button', { name: 'Login' }).click();
   await this.page.waitForURL('**/dashboard/index');
});

When('I navigate to the leave application page', async function () {
   await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList');
});

When('I enter from date {string}', async function (fromDate) {
   await this.page.locator('input[placeholder="yyyy-dd-mm"]').first().fill(fromDate);
});

When('I enter to date {string}', async function (toDate) {
   await this.page.locator('input[placeholder="yyyy-dd-mm"]').nth(1).fill(toDate);
});

When('I select leave type {string}', async function (leaveType) {
   const dropdown = this.page.locator('div.oxd-input-group:has(label:has-text("Show Leave with Status")) div.oxd-select-text-input');
   await dropdown.click();
   await this.page.locator(`div[role="option"]:has-text("${leaveType}")`).click();
});

When('I click the leave search button', async function () {
   await this.page.locator('button:has-text("Search")').click();
});

Then('I should see the leave requests in the list or a message indicating there are no records to show', async function () {
   const leaveRequests = this.page.locator('.oxd-table-card');
   const noRecordsMessage = this.page.locator('span.oxd-text--span:has-text("No Records Found")');
   const recordFoundMessage = this.page.locator('span:has-text("Record Found")');

   const isLeaveRequestsVisible = await leaveRequests.isVisible();
   const isNoRecordsMessageVisible = await noRecordsMessage.isVisible();
   const isRecordFoundMessageVisible = await recordFoundMessage.isVisible();

   expect(isLeaveRequestsVisible || isNoRecordsMessageVisible || isRecordFoundMessageVisible).toBeTruthy();
});

When('I navigate to the define leave period page', async function () {
   await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/leave/defineLeavePeriod');
});

When('I select start month {string}', async function (startMonth) {
   const dropdown = this.page.locator('div.oxd-input-group:has(label:has-text("Start Month")) div.oxd-select-text-input');
   await dropdown.click();
   await this.page.locator(`div[role="option"]:has-text("${startMonth}")`).click();
});

When('I select start date {string}', async function (startDate) {
   const dropdown = this.page.locator('div.oxd-input-group:has(label:has-text("Start Date")) div.oxd-select-text-input');
   await dropdown.click();
   await this.page.locator(`div[role="option"]:has-text("${startDate}")`).click();
});

When('I click the save button', async function () {
   await this.page.locator('button:has-text("Save")').click();
});

Then('I should see the end date {string}', async function (endDate) {
   const endDateElement = this.page.locator('div.oxd-input-group:has(label:has-text("End Date")) p.oxd-text--subtitle-2.orangehrm-leave-period');
   const endDateText = await endDateElement.textContent();
   expect(endDateText).toBe(endDate);
});

Then('I should see the current leave period {string}', async function (currentLeavePeriod) {
   const currentLeavePeriodElement = this.page.locator('div.oxd-input-group:has(label:has-text("Current Leave Period")) p.oxd-text--subtitle-2.orangehrm-leave-period');
   const currentLeavePeriodText = await currentLeavePeriodElement.textContent();
   expect(currentLeavePeriodText).toBe(currentLeavePeriod);
});