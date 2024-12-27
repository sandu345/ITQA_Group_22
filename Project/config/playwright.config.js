// config/playwright.config.js
export const use = {
   baseURL: 'http://localhost:7081', // Set the base URL for your API
   headless: true, // Run Playwright in headless mode (no UI)
   video: 'on-first-retry', // Optional: Capture video of the tests
   reporter: [["line"], ["allure-playwright"]],
};
