import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { request } from '@playwright/test';
import { expect } from '@playwright/test';

let apiContext;
let response;
let authHeader;
let responseStatus;

Before(async function() {
    apiContext = await request.newContext({
        baseURL: 'http://localhost:7081'
    });
});

function getAuthHeader(role) {
    return `Basic ${Buffer.from(`${role}:password`).toString('base64')}`;
}

Given('I am authenticated as {string}', function(role) {
    authHeader = getAuthHeader(role);
});

Given('I am not authenticated', function() {
    authHeader = null;
});

When('I send a GET request to {string}', async function(endpoint) {
    try {
        const headers = authHeader ? { 'Authorization': authHeader } : {};
        response = await apiContext.get(endpoint, { headers });
        responseStatus = response.status();
    } catch (error) {
        response = error.response;
        responseStatus = error.response?.status() ?? 500;
    }
});

When('I send a GET request to {string} without authentication', async function(endpoint) {
    try {
        response = await apiContext.get(endpoint);
        responseStatus = response.status();
    } catch (error) {
        response = error.response;
        responseStatus = error.response?.status() ?? 500;
    }
});

Then('the response status code should be {int}', function(expectedStatus) {
    expect(responseStatus).toBe(expectedStatus);
});

Then('the response should contain the correct book details', async function() {
    expect(responseStatus).toBe(200);
    const responseBody = await response.json();
    
    // Verify the response contains expected book properties
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('title');
    expect(responseBody).toHaveProperty('author');
    // Add more specific assertions based on your book data structure
});

After(async function() {
    await apiContext.dispose();
});