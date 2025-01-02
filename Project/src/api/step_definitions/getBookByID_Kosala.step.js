const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { request } = require('@playwright/test');
const { expect } = require('chai');

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

Given('I am authenticated as {string} for getBookByID', function(role) {
    authHeader = getAuthHeader(role);
});

Given('I am not authenticated for getBookByID', function() {
    authHeader = null;
});

When('I send a GET request to {string} for getBookByID', async function(endpoint) {
    try {
        const headers = authHeader ? { 'Authorization': authHeader } : {};
        response = await apiContext.get(endpoint, { headers });
        responseStatus = response.status();
    } catch (error) {
        response = error.response;
        responseStatus = error.response?.status() ?? 500;
    }
});

When('I send a GET request to {string} without authentication for getBookByID', async function(endpoint) {
    try {
        response = await apiContext.get(endpoint);
        responseStatus = response.status();
    } catch (error) {
        response = error.response;
        responseStatus = error.response?.status() ?? 500;
    }
});

Then('the response status code should be {int} for getBookByID', function(expectedStatus) {
    expect(responseStatus).to.equal(expectedStatus);
});

Then('the response should contain the correct book details for getBookByID', async function() {
    expect(responseStatus).to.equal(200);
    const responseBody = await response.json();
    
    // Verify the response contains expected book properties
    expect(responseBody).to.have.property('id');
    expect(responseBody).to.have.property('title');
    expect(responseBody).to.have.property('author');
    // Add more specific assertions based on your book data structure
});

After(async function() {
    await apiContext.dispose();
});