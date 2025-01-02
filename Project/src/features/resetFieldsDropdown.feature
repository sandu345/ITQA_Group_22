

Feature: OrangeHRM Login and Employee Management

  Background:
    Given I open the login page
    When I enter username "Admin" and password "admin123"
    And I click the login button
    Then I should be redirected to the dashboard

  Scenario: Search for Full-Time Permanent employees
    When I navigate to PIM page
    And I select Full-Time Permanent from employment status
    And I click the search button
    Then I should see the filtered results for Full-Time Permanent employees

  Scenario: Search employee by name and ID then reset
    When I navigate to PIM page
    And I enter employee name "Nishara"
    And I enter employee ID "0038"
    And I click the search button
    Then I should see the search results
    When I click the reset button
    Then the search fields should be cleared
