const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { request } = require('@playwright/test');
const { expect } = require('chai');
const { BASE_URL, context, createAuthHeader } = require('./consts');

Before(async function () {
   context.apiContext = await request.newContext({
      baseURL: BASE_URL
   });
});

Given('I am authenticated as {string} for getBookByID', function (role) {
   context.authHeader = createAuthHeader(role, 'password');
});

Given('I am not authenticated for getBookByID', function () {
   context.authHeader = null;
});

When('I send a GET request to {string} for getBookByID', async function (endpoint) {
   try {
      const headers = context.authHeader ? { 'Authorization': context.authHeader } : {};
      context.response = await context.apiContext.get(endpoint, { headers });
      context.responseStatus = context.response.status();
   } catch (error) {
      context.response = error.response;
      context.responseStatus = error.response?.status() ?? 500;
   }
});

When('I send a GET request to {string} without authentication for getBookByID', async function (endpoint) {
   try {
      context.response = await context.apiContext.get(endpoint);
      context.responseStatus = context.response.status();
   } catch (error) {
      context.response = error.response;
      context.responseStatus = error.response?.status() ?? 500;
   }
});

Then('the response status code should be {int} for getBookByID', function (expectedStatus) {
   expect(context.responseStatus).to.equal(expectedStatus);
});

Then('the response should contain the correct book details for getBookByID', async function () {
   expect(context.responseStatus).to.equal(200);
   const responseBody = await context.response.json();

   // Verify the response contains expected book properties
   expect(responseBody).to.have.property('id');
   expect(responseBody).to.have.property('title');
   expect(responseBody).to.have.property('author');
   // Add more specific assertions based on your book data structure
});

After(async function () {
   if (context.apiContext) {
      await context.apiContext.dispose();
   }
});