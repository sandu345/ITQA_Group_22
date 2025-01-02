Feature: Get Book by ID API
  As a library system user
  I want to retrieve book information by ID
  So that I can view specific book details

  Scenario: Successfully retrieve a book with valid ID
    Given I am authenticated as "admin" for getBookByID
    When I send a GET request to "/api/books/1" for getBookByID
    Then the response status code should be 200 for getBookByID
    And the response should contain the correct book details for getBookByID

  Scenario: Attempt to retrieve non-existent book
    Given I am authenticated as "admin" for getBookByID
    When I send a GET request to "/api/books/99999" for getBookByID
    Then the response status code should be 404 for getBookByID

  Scenario: Attempt to access book without authentication
    Given I am not authenticated for getBookByID
    When I send a GET request to "/api/books/1" without authentication for getBookByID
    Then the response status code should be 401 for getBookByID

  Scenario: User role can access book details
    Given I am authenticated as "user" for getBookByID
    When I send a GET request to "/api/books/1" for getBookByID
    Then the response status code should be 200 for getBookByID
    And the response should contain the correct book details for getBookByID