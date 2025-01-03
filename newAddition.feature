Feature: Book API Access Control
  As a library system user
  I want to access the book list with proper authorization
  So that I can view books securely


  Scenario: Authorized user can view books when books exist
    Given I am logged in as "user" user
    When I send GET request to "/api/books"
    Then the response status should be 200
    And the response should contain the list of books

  Scenario: Authorized user sees empty list when no books exist
    Given I am logged in as "user" user
    When I send GET request to "/api/books"
    Then the response status should be 200
    And the response should contain an empty list

  Scenario: Unauthorized user cannot access books when books exist
    Given I am not authenticated
    When I send GET request to "/api/books"
    Then the response status should be 401

  Scenario: Unauthorized user cannot access books when no books exist
    Given I am not authenticated
    When I send GET request to "/api/books"
    Then the response status should be 401

 Scenario: Attempt to retrieve non-existent book
    Given I am logged in as "user" user
    When I send a GET request to "/api/books/99999"
    Then the response status code should be 404 