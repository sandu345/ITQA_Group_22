import { Given, When, Then, After } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { request } from '@playwright/test';

let context;
let response;

Given('I am logged in as {string} user', async function(userType) {
    context = await request.newContext({
        baseURL: 'http://localhost:7081',
        extraHTTPHeaders: {
            'Authorization': 'Basic ' + Buffer.from(`${userType}:password`).toString('base64')
        }
    });
});

Given('I am not authenticated', async function() {
    context = await request.newContext({
        baseURL: 'http://localhost:7081'
    });
});


When('I send GET request to {string}', async function(endpoint) {
    response = await context.get(endpoint);
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
    response = await context.get(endpoint);
});

Then('the response status code should be {int}', async function(statusCode) {
    expect(response.status()).toBe(statusCode);
});

After(async function() {
    if (context) {
        await context.dispose();
    }
});