Feature: User Authentication Tests

Background:
    Given User navigates to the application
    And User clicks on the login link

Scenario: Login should be success
    And User enter the username as "ortoni"
    And User enter the password as "password"
    When User clicks on the Login button
    Then Login should be success

Scenario: Login should not be success
    Given User enter the username as "koushik"
    Given User enter the password as "password"
    When User clicks on the login button
    But Login should fail