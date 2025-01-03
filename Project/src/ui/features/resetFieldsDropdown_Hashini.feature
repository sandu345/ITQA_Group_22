Feature: Reset Fields Dropdown in OrangeHRM
  As an HR admin
  I want to reset the fields in the PIM search form
  So that I can clear the search criteria and start a new search

  Scenario: Search for Full-Time Permanent employees
    Given I open the login page for reset fields
    When I enter username "Admin" and password "admin123" for reset fields
    And I click the login button for reset fields
    Then I should be redirected to the dashboard for reset fields
    When I navigate to PIM page for reset fields
    And I select Full-Time Permanent from employment status for reset fields
    And I click the PIM search button for reset fields
    Then I should see the filtered results for Full-Time Permanent employees for reset fields

  Scenario: Search employee by name and ID then reset
    Given I open the login page for reset fields
    When I enter username "Admin" and password "admin123" for reset fields
    And I click the login button for reset fields
    Then I should be redirected to the dashboard for reset fields
    When I navigate to PIM page for reset fields
    And I enter employee name "Nishara" for reset fields
    And I enter employee ID "0038" for reset fields
    And I click the PIM search button for reset fields
    Then I should see the search results for reset fields
    When I click the reset button for reset fields
    Then the search fields should be cleared for reset fields
