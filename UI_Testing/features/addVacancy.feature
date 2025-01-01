Feature: Add Vacacy 
  As an admin user
  I want to add a new vacancy
  So that I can create a new job vacancy

  Scenario: Successfully add a new vacancy with valid inputs
    Given I am logged in as an admin user
    And I select the recruitment tab
    When I navigate to the vacancies page
    And I click the add button
    And I enter Vacancy Name as "QA Architect"
    And I select Job Title as "Payroll Administrator"
    And I enter Description as "Require 10 + experience"
    And I enter Hiring Manager as "JohnDoe"
    And I click the save button
    Then I should see the new vacancy in the list