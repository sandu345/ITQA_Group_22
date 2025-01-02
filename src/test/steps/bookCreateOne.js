

const { Given, When, Then, After } = require('@cucumber/cucumber');
const { request, expect } = require('@playwright/test');

// Constants
const HTTP_HEADERS = {
    CONTENT_TYPE: 'application/json'
};

const HTTP_STATUS = {
    SERVER_ERROR: 500
};

// State management
class TestContext {
    constructor() {
        this.apiContext = null;
        this.baseURL = '';
        this.lastResponse = null;
        this.responseData = [];
    }

    reset() {
        this.lastResponse = null;
        this.responseData = [];
    }
}

const context = new TestContext();

// Helpers
const createAuthHeader = (username, password) => {
    return `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
};

const parseRequestBody = (body) => {
    try {
        return typeof body === 'string' ? JSON.parse(body) : eval(`(${body})`);
    } catch (error) {
        console.error('Body parsing error:', error);
        throw error;
    }
};

// Step definitions
Given('the API endpoint is {string}', async function(endpoint) {
    context.baseURL = endpoint;
    context.apiContext = await request.newContext({ baseURL: endpoint });
});

Given('I am authenticated as {string} with password {string}', async function(username, password) {
    context.apiContext = await request.newContext({
        baseURL: context.baseURL,
        extraHTTPHeaders: {
            'Authorization': createAuthHeader(username, password),
            'Content-Type': HTTP_HEADERS.CONTENT_TYPE
        }
    });
});

When('I send a POST request to {string} with body:', async function(endpoint, body) {
    try {
        const parsedBody = parseRequestBody(body);
        const response = await context.apiContext.post(endpoint, {
            data: parsedBody,
            failOnStatusCode: false
        });

        context.lastResponse = response;
        const responseBody = await response.json().catch(() => ({}));
        context.responseData.push({ response, body: responseBody });

        console.log({
            status: response.status(),
            body: responseBody
        });
    } catch (error) {
        console.error('Request failed:', error);
        context.lastResponse = {
            status: () => error.response?.status || HTTP_STATUS.SERVER_ERROR,
            json: async () => error.response?.json() || {}
        };
    }
});

Then('the response status code should be {int}', async function(expectedStatus) {
    if (!context.lastResponse) {
        throw new Error('No API response received');
    }
    expect(context.lastResponse.status()).toBe(expectedStatus);
});

Then('both books should have different IDs', async function() {
    expect(context.responseData.length).toBeGreaterThanOrEqual(2);
    const [firstBook, secondBook] = context.responseData.slice(-2).map(data => data.body);
    expect(firstBook.id).not.toBe(secondBook.id);
    console.log({
        firstBookId: firstBook.id,
        secondBookId: secondBook.id
    });
});

Then('the response should contain an auto-generated id', async function() {
    const responseBody = await context.lastResponse.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody.id).toBeTruthy();
    console.log('Generated ID:', responseBody.id);
});

After(async function() {
    if (context.apiContext) {
        await context.apiContext.dispose();
    }
    context.reset();
});