Feature: Employee Management in OrangeHRM
  As an HR admin
  I want to navigate through the system and add new employees
  So that I can manage employee records effectively

  Scenario: Add new employee with required fields
    Given I open the login page
    When I enter username "Admin" and password "admin123"
    And I click the login button
    When I navigate to PIM module
    And I click on Add Employee
    And I fill in the required employee details

  Scenario: Save new employee
    When I click the save button
    Then the employee should be successfully added