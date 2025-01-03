const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');
const { urls, credentials, selectors } = require('./consts');

setDefaultTimeout(60000); // Set default timeout to 60 seconds

let browser;
let page;

Before(async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    this.page = page;
});

After(async function () {
    await browser.close();
});

Given('I am logged in as an admin user for applyLeave', async function () {
   await this.page.goto(urls.login);
   await this.page.getByPlaceholder('Username').fill(credentials.admin.username);
   await this.page.getByPlaceholder('Password').fill(credentials.admin.password);
   await this.page.getByRole('button', { name: 'Login' }).click();
   await this.page.waitForURL(urls.dashboard);
});

When('I navigate to the leave application page for applyLeave', async function () {
   await this.page.goto(urls.leaveList);
});

When('I enter from date {string} for applyLeave', async function (fromDate) {
   const fromDateInput = this.page.locator(selectors.fromDateInput);
   await fromDateInput.waitFor({ state: 'visible', timeout: 30000 });
   await fromDateInput.fill(fromDate);
});

When('I enter to date {string} for applyLeave', async function (toDate) {
   const toDateInput = this.page.locator(selectors.toDateInput);
   await toDateInput.waitFor({ state: 'visible', timeout: 30000 });
   await toDateInput.fill(toDate);
});

When('I select leave type {string} for applyLeave', async function (leaveType) {
   const dropdown = this.page.locator(selectors.leaveTypeDropdown);
   await dropdown.click();
   await this.page.locator(`div[role="option"]:has-text("${leaveType}")`).click();
});

When('I click the leave search button for applyLeave', async function () {
   await this.page.locator(selectors.searchButton).click();
});

Then('I should see the leave requests in the list or a message indicating there are no records to show for applyLeave', async function () {
   const leaveRequests = this.page.locator(selectors.leaveRequests);
   const noRecordsMessage = this.page.locator(selectors.noRecordsMessage);
   const recordFoundMessage = this.page.locator(selectors.recordFoundMessage);

   const isLeaveRequestsVisible = await leaveRequests.isVisible();
   const isNoRecordsMessageVisible = await noRecordsMessage.isVisible();
   const isRecordFoundMessageVisible = await recordFoundMessage.isVisible();

   if (!isLeaveRequestsVisible && !isNoRecordsMessageVisible && !isRecordFoundMessageVisible) {
      console.error('Failure: No leave requests or messages found.');
   }

   expect(isLeaveRequestsVisible || isNoRecordsMessageVisible || isRecordFoundMessageVisible).toBeTruthy();
});

When('I navigate to the define leave period page for applyLeave', async function () {
   await this.page.goto(urls.defineLeavePeriod);
});

When('I select start month {string} for applyLeave', async function (startMonth) {
   const dropdown = this.page.locator(selectors.startMonthDropdown);
   await dropdown.click();
   await this.page.locator(`div[role="option"]:has-text("${startMonth}")`).click();
});

When('I select start date {string} for applyLeave', async function (startDate) {
   const dropdown = this.page.locator(selectors.startDateDropdown);
   await dropdown.click();
   await this.page.locator(`div[role="option"]:has-text("${startDate}")`).click();
});

When('I click the save button for applyLeave', async function () {
   await this.page.locator(selectors.saveButton).click();
});

Then('I should see the end date {string} for applyLeave', async function (endDate) {
   const endDateElement = this.page.locator(selectors.endDateElement);
   const endDateText = await endDateElement.textContent();
   expect(endDateText).toBe(endDate);
});

Then('I should see the current leave period {string} for applyLeave', async function (currentLeavePeriod) {
   const currentLeavePeriodElement = this.page.locator(selectors.currentLeavePeriodElement);
   const currentLeavePeriodText = await currentLeavePeriodElement.textContent();
   expect(currentLeavePeriodText).toBe(currentLeavePeriod);
});