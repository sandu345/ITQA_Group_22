import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { request } from '@playwright/test';

let context;
let response;
let bookData;

Given('I am logged in as {string} user', async function(userType) {
    context = await request.newContext({
        baseURL: 'http://localhost:7081',
        httpCredentials: {
            username: userType,
            password: 'password'
        }
    });
});

When('I send POST request to create a book with following details:', async function(dataTable) {
    const data = dataTable.hashes()[0];
    bookData = data;
    response = await context.post('/api/books', {
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(bookData)
    });
});

Then('the response status should be {int}', async function(statusCode) {
    expect([201, 208]).toContain(response.status());
});

Then('the created book details should match the request', async function() {
    const responseText = await response.text();
    if (responseText === "Book Already Exists") {
        return true;
    }
    const responseData = JSON.parse(responseText);
    expect(responseData.title).toBe(bookData.title);
    expect(responseData.author).toBe(bookData.author);
    expect(responseData).toHaveProperty('id');
});