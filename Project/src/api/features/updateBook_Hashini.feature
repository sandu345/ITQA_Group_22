Feature: Update the book details

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