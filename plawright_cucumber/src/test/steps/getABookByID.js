import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { request } from '@playwright/test';
import { expect } from '@playwright/test';

let apiContext;
let response;
let authHeader;
let testBookData;
let responseStatus;

Before(async function() {
    apiContext = await request.newContext({
        baseURL: 'http://localhost:7081'
    });
});

Given('a test book exists in the system', async function(dataTable) {
    const bookData = dataTable.hashes()[0];
    testBookData = {
        id: parseInt(bookData.id),
        title: bookData.title,
        author: bookData.author
    };

    const adminAuth = getAuthHeader('admin');
    try {
        const createResponse = await apiContext.post('/api/books', {
            data: testBookData,
            headers: {
                'Authorization': adminAuth,
                'Content-Type': 'application/json'
            }
        });
        expect(createResponse.ok()).toBeTruthy();
    } catch (error) {
        console.error('Failed to create test book:', error);
        throw error;
    }
});

function getAuthHeader(role) {
    return `Basic ${Buffer.from(`${role}:password`).toString('base64')}`;
}

Given('I am authenticated as {string}', function(role) {
    authHeader = getAuthHeader(role);
});

When('I send a GET request to {string}', async function(endpoint) {
    try {
        response = await apiContext.get(endpoint, {
            headers: {
                'Authorization': authHeader
            }
        });
    } catch (error) {
        response = error;
    }
    responseStatus = response.status();
});

When('I send a GET request to {string} without authentication', async function(endpoint) {
    try {
        response = await apiContext.get(endpoint);
    } catch (error) {
        response = error;
    }
    responseStatus = response.status();
});

Then('the response status code should be {int}', async function(expectedStatus) {
    // Mark test as failed but don't throw error to document the bug
    if (responseStatus !== expectedStatus) {
        console.log(`Bug Found: Expected ${expectedStatus} but got ${responseStatus}`);
    }
    expect(responseStatus).toBe(expectedStatus);
});

Then('the response should contain the correct book details', async function() {
    if (responseStatus === 200) {
        const responseBody = await response.json();
        expect(responseBody).toEqual(testBookData);
    }
});

After(async function() {
    await apiContext.dispose();
});