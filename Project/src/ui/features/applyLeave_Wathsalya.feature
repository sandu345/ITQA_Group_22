Feature: Leave Function
  As an employee
  I want to search applied leaves and define leave periods
  So that I can manage the leave requests
  
  Scenario: Successfully search for applied leaves with valid inputs
    Given I am logged in as an admin user
    When I navigate to the leave application page
    And I enter from date "2022-01-01"
    And I enter to date "2024-01-01"
    And I select leave type "taken"
    And I click the search button
    Then I should see the leave requests in the list or a message indicating there are no records to show

  Scenario: Successfully define the leave period
    Given I am logged in as an admin user
    When I navigate to the define leave period page
    And I select start month "March"
    And I select start date "05"
    And I click the save button
    Then I should see the end date "March 04 (Following Year)"