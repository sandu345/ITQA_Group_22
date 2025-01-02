const { Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

Then('I should get a status code of {int}', function (expectedStatusCode) {
    console.log('Status code check:', { expected: expectedStatusCode, actual: this.response.status });
    expect(this.response.status).to.equal(expectedStatusCode);
});
