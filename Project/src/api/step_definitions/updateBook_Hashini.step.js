const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const { expect } = require('chai');

let headers;
let existingBookId;
let updateData;

Given('I have an existing book', async function () {
    headers = {
        'Authorization': 'Basic ' + Buffer.from('admin:password').toString('base64'),
        'Content-Type': 'application/json'
    };
    
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
    } catch (error) {
        console.error('Error creating book:', error);
    }
});

When('I update the book with new valid data', async function () {
    updateData = {
        title: `Updated Book ${Date.now()}`,
        author: 'Updated Author'
    };
    
    try {
        this.response = await axios.put(`http://localhost:7081/api/books/${existingBookId}`, updateData, {
            headers,
            validateStatus: () => true
        });
    } catch (error) {
        this.response = error.response || { status: 500, data: 'Internal Server Error' };
        console.error('Update error:', { error: error.message, response: this.response });
    }
});

Given('I have an invalid book ID', function () {
    existingBookId = 999999; // Non-existing ID
    headers = {
        'Authorization': 'Basic ' + Buffer.from('admin:password').toString('base64'),
        'Content-Type': 'application/json'
    };
});

When('I try to update the non-existing book', async function () {
    updateData = {
        title: `Updated Book ${Date.now()}`,
        author: 'Updated Author'
    };
    
    try {
        this.response = await axios.put(`http://localhost:7081/api/books/${existingBookId}`, updateData, {
            headers,
            validateStatus: () => true
        });
    } catch (error) {
        this.response = error.response || { status: 500, data: 'Internal Server Error' };
        console.error('Update non-existing book error:', { error: error.message, response: this.response });
    }
});

When('I update the book without title', async function () {
    updateData = {
        author: 'Updated Author'
    };
    
    try {
        this.response = await axios.put(`http://localhost:7081/api/books/${existingBookId}`, updateData, {
            headers,
            validateStatus: () => true
        });
    } catch (error) {
        this.response = error.response || { status: 500, data: 'Internal Server Error' };
        console.error('Update no title error:', { error: error.message, response: this.response });
    }
});

When('I update the book without author', async function () {
    updateData = {
        title: `Updated Book ${Date.now()}`
    };
    
    try {
        this.response = await axios.put(`http://localhost:7081/api/books/${existingBookId}`, updateData, {
            headers,
            validateStatus: () => true
        });
    } catch (error) {
        this.response = error.response || { status: 500, data: 'Internal Server Error' };
        console.error('Update no author error:', { error: error.message, response: this.response });
    }
});

Given('I have invalid credentials', function () {
    headers = {
        'Authorization': 'Basic ' + Buffer.from('invalid:wrong').toString('base64'),
        'Content-Type': 'application/json'
    };
});

When('I try to update the book', async function () {
    updateData = {
        title: `Updated Book ${Date.now()}`,
        author: 'Updated Author'
    };
    
    try {
        this.response = await axios.put(`http://localhost:7081/api/books/${existingBookId}`, updateData, {
            headers,
            validateStatus: () => true
        });
    } catch (error) {
        this.response = error.response || { status: 500, data: 'Internal Server Error' };
        console.error('Update unauthorized error:', { error: error.message, response: this.response });
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
    } catch (error) {
        console.error('Verify update error:', error);
        throw error;
    }
});