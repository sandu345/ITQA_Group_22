const { Given, When, Then, After } = require('@cucumber/cucumber');
const { request, expect } = require('@playwright/test');
const { BASE_URL, context, createAuthHeader } = require('../common');

Given('I am an authorized user', async function () {
   context.apiContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
         'Authorization': createAuthHeader('admin', 'password')
      }
   });
});

Given('I am an unauthorized user', async function () {
   context.apiContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
         'Authorization': createAuthHeader('random', 'password')
      }
   });
});

Given('I am a user with role {string}', async function (role) {
   const username = role === 'admin' ? 'admin' : 'user';
   context.apiContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
         'Authorization': createAuthHeader(username, 'password')
      }
   });
});

When('I send a DELETE request to {string}', async function (endpoint) {
   try {
      context.lastResponse = await context.apiContext.delete(endpoint);
   } catch (error) {
      context.lastResponse = {
         status: error.response?.status || 500,
         data: error.response?.data || {}
      };
   }
});

Then('I should receive a response with status code {int}', async function (expectedStatus) {
   if (!context.lastResponse) {
      throw new Error('No response received from the API');
   }
   expect(context.lastResponse.status()).toBe(expectedStatus);
});

Then('the response body should confirm successful deletion', async function () {
   const responseBody = await context.lastResponse.json();
   expect(responseBody).toHaveProperty('message', 'Book deleted successfully');
});

After(async function () {
   if (context.apiContext) {
      await context.apiContext.dispose();
   }
});