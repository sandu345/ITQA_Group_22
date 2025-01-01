// src/step_definitions/hooks.js
const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

Before(async function () {
   setDefaultTimeout(60000); // Set default timeout to 60 seconds
   this.browser = await chromium.launch({ headless: false });
   this.context = await this.browser.newContext();
   this.page = await this.context.newPage();
});

After(async function () {
   await this.browser.close();
});