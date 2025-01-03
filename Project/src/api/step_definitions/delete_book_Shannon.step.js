const { Given, When, Then, After } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const axios = require('axios');

let lastResponse;
let apiContext;

const baseURL = 'http://localhost:7081';

Given('I am an authorized user', async function () {
    apiContext = axios.create({
        baseURL,
        auth: {
            username: 'admin',
            password: 'password'
        }
    });
});

Given('I am an unauthorized user', async function () {
    apiContext = axios.create({
        baseURL,
        auth: {
            username: 'random',
            password: 'password'
        }
    });
});

Given('I am a user with role {string}', async function (role) {
    const username = role === 'admin' ? 'admin' : 'user';
    apiContext = axios.create({
        baseURL,
        auth: {
            username,
            password: 'password'
        }
    });
});

When('I send a DELETE request to {string}', async function (endpoint) {
    try {
        lastResponse = await apiContext.delete(endpoint);
    } catch (error) {
        console.error('Request failed:', error);
        lastResponse = {
            status: error.response?.status || 500,
            data: error.response?.data || {}
        };
    }
    console.log('Response status:', lastResponse.status);
    console.log('Response data:', lastResponse.data);
});

Then('I should receive a response with status code {int}', async function (expectedStatus) {
    if (!lastResponse) {
        throw new Error('No response received from the API');
    }
    expect(lastResponse.status).toBe(expectedStatus);
});

Then('the response body should confirm successful deletion', async function () {
    const responseBody = lastResponse.data;
    expect(responseBody).toHaveProperty('message', 'Book deleted successfully');
    console.log('Deletion confirmed with message:', responseBody.message);
});

After(async function () {
    lastResponse = null;
});