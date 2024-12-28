Feature: Get Books API
  As a library system user
  I want to retrieve the list of books
  So that I can view available books in the library

  Scenario: Verify empty books list when no books exist
    Given I am authenticated as a "user" with password "password"
    When I send a GET request to "/api/books"
    Then the response status code should be 200
    And the response should be an empty array