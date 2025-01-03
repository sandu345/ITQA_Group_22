const { Given, When, Then, After } = require('@cucumber/cucumber');
const { request, expect } = require('@playwright/test');
const {
   HTTP_HEADERS,
   HTTP_STATUS,
   BASE_URL,
   context,
   createAuthHeader,
   parseRequestBody,
   getCurrentDateTime
} = require('./consts');

// Step definitions
Given('the API endpoint is {string}', async function (endpoint) {
   context.baseURL = endpoint;
   context.apiContext = await request.newContext({ baseURL: endpoint });
});

Given('I am authenticated as {string} with password {string}', async function (username, password) {
   context.apiContext = await request.newContext({
      baseURL: context.baseURL,
      extraHTTPHeaders: {
         'Authorization': createAuthHeader(username, password),
         'Content-Type': HTTP_HEADERS.CONTENT_TYPE
      }
   });
});

When('I send a POST request to {string} with body:', async function (endpoint, body) {
   try {
      const parsedBody = parseRequestBody(body.replace('{datetime}', getCurrentDateTime()));
      const response = await context.apiContext.post(endpoint, {
         data: parsedBody,
         failOnStatusCode: false
      });

      context.lastResponse = response;
      let responseBody;
      try {
         responseBody = await response.json();
      } catch (error) {
         responseBody = await response.text();
      }
      context.responseData.push({ response, body: responseBody });
   } catch (error) {
      context.lastResponse = {
         status: () => error.response?.status || HTTP_STATUS.SERVER_ERROR,
         json: async () => error.response?.json() || {}
      };
   }
});

Then('the response status code for createBook should be {int}', async function (expectedStatus) {
   if (!context.lastResponse) {
      throw new Error('No API response received');
   }
   const actualStatus = context.lastResponse.status();
   expect(actualStatus).toBe(expectedStatus);
});

Then('both books should have different IDs', async function () {
   expect(context.responseData.length).toBeGreaterThanOrEqual(2);
   const [firstBook, secondBook] = context.responseData.slice(-2).map(data => data.body);
   expect(firstBook.id).not.toBe(secondBook.id);
});

Then('the response should contain an auto-generated id', async function () {
   const responseBody = await context.lastResponse.json().catch(() => context.lastResponse.text());
   expect(responseBody).toHaveProperty('id');
   expect(responseBody.id).toBeTruthy();
});

After(async function () {
   if (context.apiContext) {
      await context.apiContext.dispose();
   }
   context.reset();
});