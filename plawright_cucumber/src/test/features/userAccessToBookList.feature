Feature: Book List Access Control
  As a user
  I want to access the book list
  So that I can view available books in the library

  Scenario: User role can access book list
    Given I am authenticated as a "user" with password "password"
    When I send a GET request to fetch the book list
    Then I should receive a successful response with status code 200
    And I should receive a list of books