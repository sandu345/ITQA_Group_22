Feature: As a library system admin
I want to create a book

Scenario: Successfully create a book with valid data
    Given I am logged in as "admin" user
    When I send POST request to create a book with following details:
      | title          | author        |
      | The Great Test | John Tester   |
    Then the response status should be 201
    And the created book details should match the request

