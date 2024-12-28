Feature: Get Books API Authentication
  As a library system user
  I want to ensure that authentication is required to access the book list
  So that the library system remains secure

  Scenario: Verify unauthorized access is denied when books exist
    Given there are books in the system
    And I am not authenticated
    When I send a GET request to "/api/books"
    Then the response status code should be 401
  