const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const { expect } = require('chai');
const fs = require('fs');
const path = require('path');

let response;
let bookData;
let headers;


// Logger function
const logToFile = (description, data) => {
   const logDir = path.join(__dirname, '../logs');
   fs.mkdirSync(logDir, { recursive: true });
   const logPath = path.join(logDir, `${description.replace(/ /g, '_')}.json`);
   fs.writeFileSync(logPath, JSON.stringify(data, null, 2));
};

Given('I have valid book data', function () {
   headers = {
      'Authorization': 'Basic ' + Buffer.from('admin:password').toString('base64'),
      'Content-Type': 'application/json'
   };
   bookData = {
      title: `Test Book ${Date.now()}`,
      author: 'Test Author'
   };
   logToFile('valid_request', bookData);
});

Given('I have invalid book data without title', function () {
   headers = {
      'Authorization': 'Basic ' + Buffer.from('admin:password').toString('base64'),
      'Content-Type': 'application/json'
   };
   bookData = { author: 'Test Author' };
   logToFile('invalid_request_no_title', bookData);
});

Given('I have invalid book data without author', function () {
   headers = {
      'Authorization': 'Basic ' + Buffer.from('admin:password').toString('base64'),
      'Content-Type': 'application/json'
   };
   bookData = { title: `Test Book ${Date.now()}` };
   logToFile('invalid_request_no_author', bookData);
});

Given('I have invalid book data without title and author', function () {
   headers = {
      'Authorization': 'Basic ' + Buffer.from('admin:password').toString('base64'),
      'Content-Type': 'application/json'
   };
   bookData = {};
   logToFile('invalid_request_no_fields', bookData);
});

Given('I have valid book data but invalid credentials', function () {
   headers = {
      'Authorization': 'Basic ' + Buffer.from('invalid:wrong').toString('base64'),
      'Content-Type': 'application/json'
   };
   bookData = {
      title: `Test Book ${Date.now()}`,
      author: 'Test Author'
   };
   logToFile('invalid_credentials', bookData);
});

When('I send a POST request to {string} with the {word} data', async function (url, dataType) {
   try {
      response = await axios.post(`http://localhost:7081${url}`, bookData, {
         headers,
         validateStatus: () => true
      });
      logToFile('response', { status: response.status, data: response.data });
   } catch (error) {
      response = error.response || { status: 500, data: 'Internal Server Error' };
      logToFile('error', { error: error.message, response });
   }
});

Then('I should get a status code of {int}', function (expectedStatus) {
   expect(response.status).to.equal(expectedStatus);
});
