Feature: Book API Testing
  As a library system user
  I want to fetch all books
  So that I can view the book collection

  Scenario: Successfully fetch all books
    Given I am logged in as "admin" user
    When I send GET request to fetch all books
    Then the response status should be 200
    And the response should contain the list of books

  Scenario: Fetch books without authentication
    When I send GET request without authentication
    Then the response status should be 401