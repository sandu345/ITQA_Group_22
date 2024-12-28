import { Given, When, Then, After} from '@cucumber/cucumber';
import { expect } from '@playwright/test';

let context;
let page;
let response;
let authHeader;
let browser;


Given('I am authenticated as a {string} with password {string}', async function (username, password) {
    // Create Base64 encoded credentials
    const credentials = Buffer.from(`${username}:${password}`).toString('base64');
    authHeader = `Basic ${credentials}`;
});

When('I send a GET request to fetch the book list', async function () {
    context = await browser.newContext();
    page = await context.newPage();
    
    // Make the API request with authentication
    response = await page.request.get('http://localhost:7081/api/books', {
        headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json'
        }
    });
});

Then('I should receive a successful response with status code {int}', async function (statusCode) {
    expect(response.status()).toBe(statusCode);
});

Then('I should receive a list of books', async function () {
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBeTruthy();
});

// Hooks to clean up resources
After(async function () {
    if (context) {
        await context.close();
    }
});