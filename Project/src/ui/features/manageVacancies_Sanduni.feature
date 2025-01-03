Feature: Manage Vacancies
  As an admin user
  I want to manage job vacancies
  So that I can add and search for job vacancies

  Scenario: Successfully add a new vacancy with valid inputs
    Given I am logged in as an admin user for manageVacancies
    And I select the recruitment tab for manageVacancies
    When I navigate to the vacancies page for manageVacancies
    And I click the add button for manageVacancies
    And I enter Vacancy Name as "QA Architect" for manageVacancies
    And I select Job Title as "Payroll Administrator" for manageVacancies
    And I enter Description as "Require 10 + experience" for manageVacancies
    And I enter Hiring Manager as "Ranga  Akunuri" for manageVacancies
    And I click the save button for manageVacancies
    Then I should see the count of records increase by one for manageVacancies

  Scenario: Successfully search for the newly added vacancy
    Given I am logged in as an admin user for manageVacancies
    And I select the recruitment tab for manageVacancies
    When I navigate to the vacancies page for manageVacancies
    And I select job title "Payroll Administrator" for manageVacancies
    And I select status "Active" for manageVacancies
    And I click the search button for manageVacancies
    Then I should see the vacancies in the list for manageVacancies
