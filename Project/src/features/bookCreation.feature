Feature: Book API Testing

  Scenario: Create a book with valid data
    Given I have valid book data
    When I send a POST request to "/api/books" with the valid data
    Then I should get a status code of 201

  Scenario: Create a book with missing title
    Given I have invalid book data without title
    When I send a POST request to "/api/books" with the invalid data
    Then I should get a status code of 400

  Scenario: Create a book with missing author
    Given I have invalid book data without author
    When I send a POST request to "/api/books" with the invalid data
    Then I should get a status code of 400

  Scenario: Create a book with both title and author missing
    Given I have invalid book data without title and author
    When I send a POST request to "/api/books" with the invalid data
    Then I should get a status code of 400

  Scenario: Create a book with unauthorized user
    Given I have valid book data but invalid credentials
    When I send a POST request to "/api/books" with the valid data
    Then I should get a status code of 401


# New PUT scenarios
  Scenario: Update a book with valid data
    Given I have an existing book
    When I update the book with new valid data
    Then I should get a status code of 200

  Scenario: Update a non-existing book
    Given I have an invalid book ID
    When I try to update the non-existing book
    Then I should get a status code of 404

  Scenario: Update a book with missing title
    Given I have an existing book
    When I update the book without title
    Then I should get a status code of 400

  Scenario: Update a book with missing author
    Given I have an existing book
    When I update the book without author
    Then I should get a status code of 400

  Scenario: Update a book with unauthorized user
    Given I have an existing book
    And I have invalid credentials
    When I try to update the book
    Then I should get a status code of 401