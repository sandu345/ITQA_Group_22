Feature: Employee Timesheet Management in OrangeHRM
  As an HR admin
  I want to navigate through the system and view employee timesheets
  So that I can manage time records effectively

  Scenario: View an employee's timesheet
    Given I open the login page
    When I enter username "Admin" and password "admin123"
    And I click the login button
    When I navigate to Time module
    And I search for employee "John Doe" in the timesheet search bar
    And I click the view button for the selected employee
    Then I should see the timesheet details

  Scenario: View pending timesheets for action
    Given I open the login page
    When I enter username "Admin" and password "admin123"
    And I click the login button
    When I navigate to Time module
    And I click the "View" button in the "Timesheets Pending Action" box
    Then I should see the pending timesheet details
