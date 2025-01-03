Feature: Leave Function
  As an employee
  I want to search applied leaves and define leave periods
  So that I can manage the leave requests
  
  Scenario: Successfully search for applied leaves with valid inputs
    Given I am logged in as an admin user for applyLeave
    When I navigate to the leave application page for applyLeave
    And I enter from date "2022-01-01" for applyLeave
    And I enter to date "2024-01-01" for applyLeave
    And I select leave type "taken" for applyLeave
    And I click the leave search button for applyLeave
    Then I should see the leave requests in the list or a message indicating there are no records to show for applyLeave

  Scenario: Successfully define the leave period
    Given I am logged in as an admin user for applyLeave
    When I navigate to the define leave period page for applyLeave
    And I select start month "March" for applyLeave
    And I select start date "05" for applyLeave
    And I click the save button for applyLeave
    Then I should see the end date "March 04 (Following Year)" for applyLeave