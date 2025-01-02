const { Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

Then('I should get a status code of {int}', function (expectedStatusCode) {
    expect(this.response.status).to.equal(expectedStatusCode);
});
