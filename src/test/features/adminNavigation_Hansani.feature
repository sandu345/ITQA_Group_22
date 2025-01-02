Feature: Admin Navigation


  Scenario: Search Admin and Logout
    Given I open the login page
    When I enter username "Admin" and password "admin123"
    And I click the login button
    And I search for "Admin"
    And I click profile button
    And I click logout
    Then I should be redirected to login page

  Scenario: Add Admin Navigation and Logout
    Given I open the login page
    When I enter username "Admin" and password "admin123"
    And I click the login button
    And I click on Admin menu
    And I click Add button
    And I click Cancel button
    And I click profile button
    And I click logout
    Then I should be redirected to login page
