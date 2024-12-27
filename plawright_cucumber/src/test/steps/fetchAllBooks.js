// import { Given, When, Then } from '@cucumber/cucumber';
// import { expect } from '@playwright/test';
// import { request } from '@playwright/test';

// let context;
// let response;

// Given('I am logged in as {string} user', async function(userType) {
//     context = await request.newContext({
//         baseURL: 'http://localhost:7081',
//         httpCredentials: {
//             username: userType,
//             password: 'password'
//         }
//     });
// });

// When('I send GET request to fetch all books', async function() {
//     response = await context.get('/api/books');
// });

// When('I send GET request without authentication', async function() {
//     context = await request.newContext({
//         baseURL: 'http://localhost:7081'
//     });
//     response = await context.get('/api/books');
// });

// Then('the response status should be {int}', async function(statusCode) {
//     expect(response.status()).toBe(statusCode);
// });

// Then('the response should contain the list of books', async function() {
//     const books = await response.json();
//     expect(Array.isArray(books)).toBeTruthy();
//     expect(books.length).toBeGreaterThan(0);
    
//     // Verify book structure
//     const firstBook = books[0];
//     expect(firstBook).toHaveProperty('id');
//     expect(firstBook).toHaveProperty('title');
//     expect(firstBook).toHaveProperty('author');
// });