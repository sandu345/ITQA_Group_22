const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const { expect } = require('chai');
const { BASE_URL, context, createAuthHeader } = require('./consts');

let headers;
let existingBookId;
let updateData;

Given('I have an existing book', async function () {
   headers = {
      'Authorization': createAuthHeader('admin', 'password'),
      'Content-Type': 'application/json'
   };

   // First create a book to update
   const createData = {
      title: `Test Book ${Date.now()}`,
      author: 'Test Author'
   };

   try {
      const createResponse = await axios.post(`${BASE_URL}/api/books`, createData, {
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
      id: existingBookId,
      title: `Updated Book ${Date.now()}`,
      author: 'Updated Author'
   };

   try {
      this.response = await axios.put(`${BASE_URL}/api/books/${existingBookId}`, updateData, {
         headers,
         validateStatus: () => true
      });
   } catch (error) {
      this.response = error.response || { status: 500, data: 'Internal Server Error' };
   }
});

Given('I have an invalid book ID', function () {
   existingBookId = 999999; // Non-existing ID
   headers = {
      'Authorization': createAuthHeader('admin', 'password'),
      'Content-Type': 'application/json'
   };
});

When('I try to update the non-existing book', async function () {
   updateData = {
      id: existingBookId,
      title: `Updated Book ${Date.now()}`,
      author: 'Updated Author'
   };

   try {
      this.response = await axios.put(`${BASE_URL}/api/books/${existingBookId}`, updateData, {
         headers,
         validateStatus: () => true
      });
   } catch (error) {
      this.response = error.response || { status: 500, data: 'Internal Server Error' };
   }
});

When('I update the book without title', async function () {
   updateData = {
      id: existingBookId,
      author: 'Updated Author'
   };

   try {
      this.response = await axios.put(`${BASE_URL}/api/books/${existingBookId}`, updateData, {
         headers,
         validateStatus: () => true
      });
   } catch (error) {
      this.response = error.response || { status: 500, data: 'Internal Server Error' };
   }
});

When('I update the book without author', async function () {
   updateData = {
      id: existingBookId,
      title: `Updated Book ${Date.now()}`
   };

   try {
      this.response = await axios.put(`${BASE_URL}/api/books/${existingBookId}`, updateData, {
         headers,
         validateStatus: () => true
      });
   } catch (error) {
      this.response = error.response || { status: 500, data: 'Internal Server Error' };
   }
});

Given('I have invalid credentials', function () {
   headers = {
      'Authorization': createAuthHeader('invalid', 'wrong'),
      'Content-Type': 'application/json'
   };
});

When('I try to update the book', async function () {
   updateData = {
      title: `Updated Book ${Date.now()}`,
      author: 'Updated Author'
   };

   try {
      this.response = await axios.put(`${BASE_URL}/api/books/${existingBookId}`, updateData, {
         headers,
         validateStatus: () => true
      });
   } catch (error) {
      this.response = error.response || { status: 500, data: 'Internal Server Error' };
   }
});

Then('the book details should be updated', async function () {
   try {
      // Verify the update by getting the book
      const verifyResponse = await axios.get(`${BASE_URL}/api/books/${existingBookId}`, {
         headers: {
            'Authorization': createAuthHeader('admin', 'password')
         },
         validateStatus: () => true
      });

      expect(verifyResponse.data.title).to.equal(updateData.title);
      expect(verifyResponse.data.author).to.equal(updateData.author);
   } catch (error) {
      throw error;
   }
});