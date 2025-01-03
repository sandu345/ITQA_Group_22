const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { request } = require('playwright');
const { expect } = require('@playwright/test');

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

const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().replace(/[-:.]/g, '');
};

setDefaultTimeout(60000); // Set default timeout to 60 seconds

let apiContext;

Before(async function () {
    apiContext = await request.newContext({
        baseURL: 'http://localhost:7081',
        extraHTTPHeaders: {
            'Authorization': 'Basic dXNlcjpwYXNzd29yZA==',
            'Content-Type': 'application/json'
        }
    });
});

After(async function () {
    await apiContext.dispose();
});

Given('the API server is running', async function () {
    const response = await apiContext.get('/health');
    expect(response.ok()).toBeTruthy();
});

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
        console.error('Request failed:', error);
        context.lastResponse = {
            status: () => error.response?.status || HTTP_STATUS.SERVER_ERROR,
            json: async () => error.response?.json() || {}
        };
    }
});

When('I create a new book with title {string} and author {string}', async function (title, author) {
    const response = await apiContext.post('/api/books', {
        data: {
            title: title,
            author: author
        }
    });
    this.response = response;
});

Then('the response status code should be {int}', async function(expectedStatus) {
    if (!context.lastResponse) {
        throw new Error('No API response received');
    }
    const actualStatus = context.lastResponse.status();
    if (actualStatus !== expectedStatus) {
        console.error('Status code check failed:', { expected: expectedStatus, actual: actualStatus });
    }
    expect(actualStatus).toBe(expectedStatus);
});

Then('both books should have different IDs', async function() {
    expect(context.responseData.length).toBeGreaterThanOrEqual(2);
    const [firstBook, secondBook] = context.responseData.slice(-2).map(data => data.body);
    expect(firstBook.id).not.toBe(secondBook.id);
});

Then('the response should contain an auto-generated id', async function() {
    const responseBody = await context.lastResponse.json().catch(() => context.lastResponse.text());
    expect(responseBody).toHaveProperty('id');
    expect(responseBody.id).toBeTruthy();
});

Then('the book should be created successfully', async function () {
    expect(this.response.status()).toBe(201);
    const responseBody = await this.response.json();
    expect(responseBody.title).toBe(this.title);
    expect(responseBody.author).toBe(this.author);
});

After(async function() {
    if (context.apiContext) {
        await context.apiContext.dispose();
    }
    context.reset();
});