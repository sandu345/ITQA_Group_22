const { Given, When, Then, After } = require('@cucumber/cucumber');
const { expect } = require('chai');
const { request } = require('@playwright/test');

let context;
let response;

Given('the system is running', async function() {
    // This step can be used to ensure the system is up and running
    // For now, we assume the system is always running
    return true;
});

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

Given('there are books in the system', async function() {
    // Assume the system state
});

Given('there are no books in the system', async function() {
    // Assume the system state
});

When('I send GET request to {string}', async function(endpoint) {
    response = await context.get(endpoint);
});

Then('the response status should be {int}', async function(statusCode) {
    expect(response.status()).to.equal(statusCode);
});

Then('the response should contain the list of books', async function() {
    const books = await response.json();
    expect(Array.isArray(books)).to.be.true;
    if (books.length > 0) {
        const firstBook = books[0];
        expect(firstBook).to.have.property('id');
        expect(firstBook).to.have.property('title');
        expect(firstBook).to.have.property('author');
    }
});

Then('the response should contain an empty list', async function() {
    const books = await response.json();
    expect(Array.isArray(books)).to.be.true;
    expect(books.length).to.equal(0);
});

After(async function() {
    if (context) {
        await context.dispose();
    }
});