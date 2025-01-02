const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const { expect } = require('chai');

let bookData;
let headers;

Given('I have valid book data', function () {
   headers = {
      'Authorization': 'Basic ' + Buffer.from('admin:password').toString('base64'),
      'Content-Type': 'application/json'
   };
   bookData = {
      title: `Test Book ${Date.now()}`,
      author: 'Test Author'
   };
   console.log('Valid request:', bookData);
});

Given('I have invalid book data without title', function () {
   headers = {
      'Authorization': 'Basic ' + Buffer.from('admin:password').toString('base64'),
      'Content-Type': 'application/json'
   };
   bookData = { author: 'Test Author' };
   console.log('Invalid request no title:', bookData);
});

Given('I have invalid book data without author', function () {
   headers = {
      'Authorization': 'Basic ' + Buffer.from('admin:password').toString('base64'),
      'Content-Type': 'application/json'
   };
   bookData = { title: `Test Book ${Date.now()}` };
   console.log('Invalid request no author:', bookData);
});

Given('I have invalid book data without title and author', function () {
   headers = {
      'Authorization': 'Basic ' + Buffer.from('admin:password').toString('base64'),
      'Content-Type': 'application/json'
   };
   bookData = {};
   console.log('Invalid request no fields:', bookData);
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
   console.log('Invalid credentials:', bookData);
});

When('I send a POST request to {string} with the {word} data', async function (url, dataType) {
   try {
      this.response = await axios.post(`http://localhost:7081${url}`, bookData, {
         headers,
         validateStatus: () => true
      });
      console.log('Response:', { status: this.response.status, data: this.response.data });
   } catch (error) {
      this.response = error.response || { status: 500, data: 'Internal Server Error' };
      console.error('Error:', { error: error.message, response: this.response });
   }
});

