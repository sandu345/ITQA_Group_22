// import { Given, When, Then } from '@cucumber/cucumber';
// import { expect } from '@playwright/test';
// import { request } from '@playwright/test';

// let context;
// let response;
// let requestBody;
// const existingBookId = 1; // Assuming book with ID 1 exists

// // Helper function to set up authentication
// async function getAuthHeader(username, password) {
//     return 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
// }

// Given('I have an existing book', async function () {
//     // This step is automatically run before each scenario
//     // No setup needed as we're assuming the book exists
// });

// Given('I am logged in as {string} user', async function (role) {
//     const password = 'password'; // Same password for all users as per requirements
//     context = await request.newContext({
//         baseURL: 'http://localhost:7081',
//         extraHTTPHeaders: {
//             'Authorization': await getAuthHeader(role, password),
//             'Content-Type': 'application/json'
//         }
//     });
// });

// Given('I have invalid credentials', async function () {
//     context = await request.newContext({
//         baseURL: 'http://localhost:7081',
//         extraHTTPHeaders: {
//             'Authorization': await getAuthHeader('invalid', 'invalid'),
//             'Content-Type': 'application/json'
//         }
//     });
// });


// When('I update the book with new valid data', async function () {
//     requestBody = {
//         id: existingBookId,
//         title: 'Updated Book Title',
//         author: 'Updated Author'
//     };
    
//     response = await context.put(`/api/books/${existingBookId}`, {
//         data: requestBody
//     });
// });

// When('I try to update the book', async function () {
//     requestBody = {
//         id: existingBookId,
//         title: 'Updated Book Title',
//         author: 'Updated Author'
//     };
    
//     response = await context.put(`/api/books/${existingBookId}`, {
//         data: requestBody
//     });
// });

// When('I update the book with following invalid data', async function (dataTable) {
//     const invalidData = {};
//     dataTable.hashes().forEach(row => {
//         // Convert string values to appropriate types based on the scenario
//         let value = row.value;
//         if (value === 'true') value = true;
//         else if (value === 'false') value = false;
//         else if (!isNaN(value)) value = Number(value);
//         else if (value.startsWith('"') && value.endsWith('"')) {
//             value = value.slice(1, -1); // Remove quotes for string values
//         }
//         invalidData[row.field] = value;
//     });
    
//     response = await context.put(`/api/books/${existingBookId}`, {
//         data: invalidData
//     });
// });

// When('I try to update the book with valid data', async function () {
//     requestBody = {
//         id: existingBookId,
//         title: 'Updated Book Title',
//         author: 'Updated Author'
//     };
    
//     response = await context.put(`/api/books/${existingBookId}`, {
//         data: requestBody
//     });
// });

// Then('I should get a status code of {int}', async function (statusCode) {
//     expect(response.status()).toBe(statusCode);
// });

