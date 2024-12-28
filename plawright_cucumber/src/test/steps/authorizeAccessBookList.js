import { Given, When, Then, After } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { request } from "@playwright/test";

let context;
let response;

Given("there are books in the system", async function () {
  // This step just verifies books exist but doesn't create them
  // We're testing with existing data
  const tempContext = await request.newContext({
    baseURL: "http://localhost:7081",
    httpCredentials: {
      username: "user",
      password: "password",
    },
  });

  const checkResponse = await tempContext.get("/api/books");
  const books = await checkResponse.json();
  expect(books.length).toBeGreaterThan(0);

  await tempContext.dispose();
});

Given("I am not authenticated", async function () {
  context = await request.newContext({
    baseURL: "http://localhost:7081",
  });
});

When("I send a GET request to {string}", async function (endpoint) {
  response = await context.get(endpoint);
});

Then("the response status code should be {int}", async function (statusCode) {
  expect(response.status()).toBe(statusCode);
});

// Then(
//   "the response should contain error message {string}",
//   async function (errorMessage) {
//     const responseBody = await response.text();
//     expect(responseBody).toContain(errorMessage);
//   }
// );

// Cleanup after scenario
After(async function () {
  if (context) {
    await context.dispose();
  }
});
