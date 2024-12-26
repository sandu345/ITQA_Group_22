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

  Scenario: Create a book with unauthorized user
    Given I have valid book data but invalid credentials
    When I send a POST request to "/api/books" with the valid data
    Then I should get a status code of 401