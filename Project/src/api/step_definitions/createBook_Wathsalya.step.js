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
});

Given('I have invalid book data without title', function () {
   headers = {
      'Authorization': 'Basic ' + Buffer.from('admin:password').toString('base64'),
      'Content-Type': 'application/json'
   };
   bookData = { author: 'Test Author' };
});

Given('I have invalid book data without author', function () {
   headers = {
      'Authorization': 'Basic ' + Buffer.from('admin:password').toString('base64'),
      'Content-Type': 'application/json'
   };
   bookData = { title: `Test Book ${Date.now()}` };
});

Given('I have invalid book data without title and author', function () {
   headers = {
      'Authorization': 'Basic ' + Buffer.from('admin:password').toString('base64'),
      'Content-Type': 'application/json'
   };
   bookData = {};
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
});

When('I send a POST request to {string} with the {word} data', async function (url, dataType) {
   try {
      this.response = await axios.post(`http://localhost:7081${url}`, bookData, {
         headers,
         validateStatus: () => true
      });
   } catch (error) {
      this.response = error.response || { status: 500, data: 'Internal Server Error' };
   }
});

