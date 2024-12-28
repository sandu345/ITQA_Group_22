import { Given, When, Then, After } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { request } from '@playwright/test';

let context;
let response;

Given('I am authenticated as a {string} with password {string}', async function (username, password) {
    // Create a new context for API requests
    context = await request.newContext({
        baseURL: 'http://localhost:7081',
        httpCredentials: {
            username: username,
            password: password
        }
    });
});

When('I send a GET request to {string}', async function (endpoint) {
    response = await context.get(endpoint);
});

Then('the response status code should be {int}', async function (statusCode) {
    expect(response.status()).toBe(statusCode);
});

Then('the response should be an empty array', async function () {
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBe(0);
});

// Cleanup after each scenario
After(async function () {
    if (context) {
        await context.dispose();
    }
});