const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const { expect } = require('chai');
const { BASE_URL, context, createAuthHeader } = require('./consts');

let bookData;
let headers;

Given('I have valid book data', function () {
   headers = {
      'Authorization': createAuthHeader('admin', 'password'),
      'Content-Type': 'application/json'
   };
   bookData = {
      title: `Test Book ${Date.now()}`,
      author: 'Test Author'
   };
});

Given('I have invalid book data without title', function () {
   headers = {
      'Authorization': createAuthHeader('admin', 'password'),
      'Content-Type': 'application/json'
   };
   bookData = { author: 'Test Author' };
});

Given('I have invalid book data without author', function () {
   headers = {
      'Authorization': createAuthHeader('admin', 'password'),
      'Content-Type': 'application/json'
   };
   bookData = { title: `Test Book ${Date.now()}` };
});

Given('I have invalid book data without title and author', function () {
   headers = {
      'Authorization': createAuthHeader('admin', 'password'),
      'Content-Type': 'application/json'
   };
   bookData = {};
});

Given('I have valid book data but invalid credentials', function () {
   headers = {
      'Authorization': createAuthHeader('invalid', 'wrong'),
      'Content-Type': 'application/json'
   };
   bookData = {
      title: `Test Book ${Date.now()}`,
      author: 'Test Author'
   };
});

When('I send a POST request to {string} with the {word} data', async function (url, dataType) {
   try {
      this.response = await axios.post(`${BASE_URL}${url}`, bookData, {
         headers,
         validateStatus: () => true
      });
   } catch (error) {
      this.response = error.response || { status: 500, data: 'Internal Server Error' };
   }
});

