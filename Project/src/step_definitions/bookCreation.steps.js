const cucumber = require('@cucumber/cucumber');
const axios = require('axios');
const chai = require('chai');

const Given = cucumber.Given;
const When = cucumber.When;
const Then = cucumber.Then;
const expect = chai.expect;

// Shared variables
let response;
let bookData;
let headers;

// Function to create auth header
const createAuthHeader = (username, password) => {
    const auth = Buffer.from(`${username}:${password}`).toString('base64');
    return `Basic ${auth}`;
};

// Function to create request headers
const createHeaders = (username, password) => ({
    'Authorization': createAuthHeader(username, password),
    'Content-Type': 'application/json'
});

Given('I have valid book data', function() {
    headers = createHeaders('admin', 'password');
    bookData = {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald'
    };
});

Given('I have invalid book data without title', function() {
    headers = createHeaders('admin', 'password');
    bookData = {
        author: 'F. Scott Fitzgerald'
    };
});

Given('I have invalid book data without author', function() {
    headers = createHeaders('admin', 'password');
    bookData = {
        title: 'The Great Gatsby'
    };
});

Given('I have valid book data but invalid credentials', function() {
    headers = createHeaders('admin', 'wrongpassword');
    bookData = {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald'
    };
});

When('I send a POST request to {string} with the valid data', async function(url) {
    try {
        response = await axios.post(`http://localhost:7081${url}`, bookData, { 
            headers,
            validateStatus: function (status) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        });
    } catch (error) {
        console.error('Request failed:', error.message);
        response = error.response || {
            status: 500,
            data: 'Internal Server Error'
        };
    }
});

When('I send a POST request to {string} with the invalid data', async function(url) {
    try {
        response = await axios.post(`http://localhost:7081${url}`, bookData, { 
            headers,
            validateStatus: function (status) {
                return status < 500;
            }
        });
    } catch (error) {
        console.error('Request failed:', error.message);
        response = error.response || {
            status: 500,
            data: 'Internal Server Error'
        };
    }
});

Then('I should get a status code of {int}', function(statusCode) {
    if (response.status !== statusCode) {
        console.log('Expected status:', statusCode);
        console.log('Actual response:', {
            status: response.status,
            data: response.data
        });
    }
    expect(response.status).to.equal(statusCode);
});