Feature: Book API Testing
  As a library system user
  I want to fetch all books
  So that I can view the book collection

  Scenario: Successfully fetch books when books exist
    Given I am logged in as "admin" user
    And there are books in the system
    When I send GET request to fetch all books
    Then the response status should be 200
    And the response should contain the list of books

  Scenario: Successfully fetch empty book list when no books exist
    Given I am logged in as "admin" user
    And there are no books in the system
    When I send GET request to fetch all books
    Then the response status should be 200
    And the response should contain an empty list


