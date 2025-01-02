const { Given, When, Then, After } = require('@cucumber/cucumber');
const { request } = require('@playwright/test');
const { expect } = require('@playwright/test');

let apiContext;
let baseURL;
let lastResponse;
let responseData = [];

Given('the API endpoint is {string}', async function (endpoint) {
    baseURL = endpoint;
    apiContext = await request.newContext({
        baseURL: endpoint
    });
});

Given('I am authenticated as {string} with password {string}', async function (username, password) {
    const authBuffer = Buffer.from(`${username}:${password}`).toString('base64');
    apiContext = await request.newContext({
        baseURL: baseURL,
        extraHTTPHeaders: {
            'Authorization': `Basic ${authBuffer}`,
            'Content-Type': 'application/json'
        }
    });
});

When('I send a POST request to {string} with body:', async function (endpoint, body) {
    try {
        let parsedBody = body;
        try {
            // Handle both JSON string and template literal cases
            parsedBody = typeof body === 'string' ? JSON.parse(body) : eval(`(${body})`);
        } catch (e) {
            console.error('Error parsing body:', e);
        }

        const response = await apiContext.post(endpoint, {
            data: parsedBody,
            failOnStatusCode: false
        });
        
        lastResponse = response;
        const responseBody = await response.json().catch(() => ({}));
        responseData.push({ response, body: responseBody });
        
        console.log('Response Status:', response.status());
        console.log('Response Body:', responseBody);
        
    } catch (error) {
        console.error('Request failed:', error);
        lastResponse = {
            status: () => error.response?.status || 500,
            json: async () => error.response?.json() || {}
        };
    }
});

Then('the response status code should be {int}', async function (expectedStatus) {
    if (!lastResponse) {
        throw new Error('No response received from the API');
    }
    expect(lastResponse.status()).toBe(expectedStatus);
});

Then('both books should have different IDs', async function () {
    expect(responseData.length).toBeGreaterThanOrEqual(2);
    const firstBook = responseData[responseData.length - 2].body;
    const secondBook = responseData[responseData.length - 1].body;
    expect(firstBook.id).not.toBe(secondBook.id);
    console.log(`First book ID: ${firstBook.id}, Second book ID: ${secondBook.id}`);
});

Then('the response should contain an auto-generated id', async function () {
    const responseBody = await lastResponse.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody.id).toBeTruthy();
    console.log('Auto-generated book ID:', responseBody.id);
});

After(async function () {
    if (apiContext) {
        await apiContext.dispose();
    }
    lastResponse = null;
    responseData = [];
});

