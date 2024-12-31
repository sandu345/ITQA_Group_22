const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const { expect } = require('chai');
const fs = require('fs');
const path = require('path');

let response;
let bookData;
let headers;

<<<<<<< HEAD

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

///////////////////////////////////////////////////////////////////////

// Add these variables at the top with your existing ones
let existingBookId;
let updateData;

// Add these new step definitions

Given('I have an existing book', async function () {
=======
// Logger function
const logToFile = (description, data) => {
    const logDir = path.join(__dirname, '../logs');
    fs.mkdirSync(logDir, { recursive: true });
    const logPath = path.join(logDir, `${description.replace(/ /g, '_')}.json`);
    fs.writeFileSync(logPath, JSON.stringify(data, null, 2));
};

Given('I have valid book data', function () {
>>>>>>> 08aa95842e2ef320194aeb2eaabcbcd62b80ae59
    headers = {
        'Authorization': 'Basic ' + Buffer.from('admin:password').toString('base64'),
        'Content-Type': 'application/json'
    };
<<<<<<< HEAD
    
    // First create a book to update
    const createData = {
        title: `Test Book ${Date.now()}`,
        author: 'Test Author'
    };
    
    try {
        const createResponse = await axios.post('http://localhost:7081/api/books', createData, {
            headers,
            validateStatus: () => true
        });
        existingBookId = createResponse.data.id;
        logToFile('create_book_for_update', createResponse.data);
    } catch (error) {
        logToFile('create_book_error', error);
    }
});

When('I update the book with new valid data', async function () {
    updateData = {
        title: `Updated Book ${Date.now()}`,
        author: 'Updated Author'
    };
    
    try {
        response = await axios.put(`http://localhost:7081/api/books/${existingBookId}`, updateData, {
            headers,
            validateStatus: () => true
        });
        logToFile('update_response', { status: response.status, data: response.data });
    } catch (error) {
        response = error.response || { status: 500, data: 'Internal Server Error' };
        logToFile('update_error', { error: error.message, response });
    }
});

Given('I have an invalid book ID', function () {
    existingBookId = 999999; // Non-existing ID
=======
    bookData = {
        title: `Test Book ${Date.now()}`,
        author: 'Test Author'
    };
    logToFile('valid_request', bookData);
});

Given('I have invalid book data without title', function () {
>>>>>>> 08aa95842e2ef320194aeb2eaabcbcd62b80ae59
    headers = {
        'Authorization': 'Basic ' + Buffer.from('admin:password').toString('base64'),
        'Content-Type': 'application/json'
    };
<<<<<<< HEAD
});

When('I try to update the non-existing book', async function () {
    updateData = {
        title: `Updated Book ${Date.now()}`,
        author: 'Updated Author'
    };
    
    try {
        response = await axios.put(`http://localhost:7081/api/books/${existingBookId}`, updateData, {
            headers,
            validateStatus: () => true
        });
        logToFile('update_nonexisting_response', { status: response.status, data: response.data });
    } catch (error) {
        response = error.response || { status: 500, data: 'Internal Server Error' };
        logToFile('update_nonexisting_error', { error: error.message, response });
    }
});

When('I update the book without title', async function () {
    updateData = {
        author: 'Updated Author'
    };
    
    try {
        response = await axios.put(`http://localhost:7081/api/books/${existingBookId}`, updateData, {
            headers,
            validateStatus: () => true
        });
        logToFile('update_no_title_response', { status: response.status, data: response.data });
    } catch (error) {
        response = error.response || { status: 500, data: 'Internal Server Error' };
        logToFile('update_no_title_error', { error: error.message, response });
    }
});

When('I update the book without author', async function () {
    updateData = {
        title: `Updated Book ${Date.now()}`
    };
    
    try {
        response = await axios.put(`http://localhost:7081/api/books/${existingBookId}`, updateData, {
            headers,
            validateStatus: () => true
        });
        logToFile('update_no_author_response', { status: response.status, data: response.data });
    } catch (error) {
        response = error.response || { status: 500, data: 'Internal Server Error' };
        logToFile('update_no_author_error', { error: error.message, response });
    }
});

Given('I have invalid credentials', function () {
=======
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
>>>>>>> 08aa95842e2ef320194aeb2eaabcbcd62b80ae59
    headers = {
        'Authorization': 'Basic ' + Buffer.from('invalid:wrong').toString('base64'),
        'Content-Type': 'application/json'
    };
<<<<<<< HEAD
});

When('I try to update the book', async function () {
    updateData = {
        title: `Updated Book ${Date.now()}`,
        author: 'Updated Author'
    };
    
    try {
        response = await axios.put(`http://localhost:7081/api/books/${existingBookId}`, updateData, {
            headers,
            validateStatus: () => true
        });
        logToFile('update_unauthorized_response', { status: response.status, data: response.data });
    } catch (error) {
        response = error.response || { status: 500, data: 'Internal Server Error' };
        logToFile('update_unauthorized_error', { error: error.message, response });
    }
});

Then('the book details should be updated', async function () {
    try {
        // Verify the update by getting the book
        const verifyResponse = await axios.get(`http://localhost:7081/api/books/${existingBookId}`, {
            headers: {
                'Authorization': 'Basic ' + Buffer.from('admin:password').toString('base64')
            },
            validateStatus: () => true
        });
        
        expect(verifyResponse.data.title).to.equal(updateData.title);
        expect(verifyResponse.data.author).to.equal(updateData.author);
        
        logToFile('verify_update', verifyResponse.data);
    } catch (error) {
        logToFile('verify_update_error', error);
        throw error;
    }
=======
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
>>>>>>> 08aa95842e2ef320194aeb2eaabcbcd62b80ae59
});