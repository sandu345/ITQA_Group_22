Feature: Employee Timesheet Management in OrangeHRM
  As an HR admin
  I want to navigate through the system and view employee timesheets
  So that I can manage time records effectively

  Scenario: View an employee's timesheet
    Given I open the login page for timesheet management
    When I enter username "Admin" and password "admin123" for timesheet management
    And I click the login button for timesheet management
    When I navigate to Time module for timesheet management
    And I search and select employee name "savina dulvin dulvin" in the timesheet search bar
    And I click the view button for the selected employee
    Then I should be redirected to the employee's timesheet page with a valid URL

  Scenario: View pending timesheets for action
    Given I open the login page for timesheet management
    When I enter username "Admin" and password "admin123" for timesheet management
    And I click the login button for timesheet management
    When I navigate to Time module for timesheet management
    And I click the "View" button in the "Timesheets Pending Action" box
    Then I should be redirected to the pending timesheet page with a valid URL
