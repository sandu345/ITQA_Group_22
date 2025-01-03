const { Given, When, Then, After } = require('@cucumber/cucumber');
const { request, expect } = require('@playwright/test');
const { BASE_URL, context, createAuthHeader } = require('./common');

let response;

Given('I am logged in as {string} user', async function(userType) {
    context.apiContext = await request.newContext({
        baseURL: BASE_URL,
        extraHTTPHeaders: {
            'Authorization': createAuthHeader(userType, 'password')
        }
    });
});

Given('I am not authenticated', async function() {
    context.apiContext = await request.newContext({
        baseURL: BASE_URL
    });
});

When('I send GET request to {string}', async function(endpoint) {
    response = await context.apiContext.get(endpoint);
});

Then('the response status should be {int}', async function(statusCode) {
    expect(response.status()).toBe(statusCode);
});

Then('the response should contain the list of books', async function() {
    const books = await response.json();
    expect(Array.isArray(books)).toBeTruthy();
    if (books.length > 0) {
        const firstBook = books[0];
        expect(firstBook).toHaveProperty('id');
        expect(firstBook).toHaveProperty('title');
        expect(firstBook).toHaveProperty('author');
    }
});

Then('the response should contain an empty list', async function() {
    const books = await response.json();
    expect(Array.isArray(books)).toBeTruthy();
});

When('I send a GET request to {string}', async function(endpoint) {
    response = await context.apiContext.get(endpoint);
});

Then('the response status code for getAllBooks should be {int}', async function(statusCode) {
    expect(response.status()).toBe(statusCode);
});

After(async function() {
    if (context.apiContext) {
        await context.apiContext.dispose();
    }
});