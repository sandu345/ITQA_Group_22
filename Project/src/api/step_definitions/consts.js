const { request } = require('@playwright/test');

// Constants
const HTTP_HEADERS = {
    CONTENT_TYPE: 'application/json'
};

const HTTP_STATUS = {
    SERVER_ERROR: 500
};

const BASE_URL = 'http://localhost:7081';
const AUTH_HEADER = (username, password) => `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;

// State management
class TestContext {
    constructor() {
        this.apiContext = null;
        this.baseURL = BASE_URL;
        this.lastResponse = null;
        this.responseData = [];
    }

    reset() {
        this.lastResponse = null;
        this.responseData = [];
    }
}

const context = new TestContext();

// Helpers
const createAuthHeader = (username, password) => {
    return AUTH_HEADER(username, password);
};

const parseRequestBody = (body) => {
    try {
        return typeof body === 'string' ? JSON.parse(body) : eval(`(${body})`);
    } catch (error) {
        console.error('Body parsing error:', error);
        throw error;
    }
};

const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().replace(/[-:.]/g, '');
};

module.exports = {
    HTTP_HEADERS,
    HTTP_STATUS,
    BASE_URL,
    AUTH_HEADER,
    TestContext,
    context,
    createAuthHeader,
    parseRequestBody,
    getCurrentDateTime
};
