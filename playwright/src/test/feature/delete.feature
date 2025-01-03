Feature: Delete Book
    Scenario: Successfully delete a book with a valid ID
        Given I am an authorized user
        When I send a DELETE request to "/api/books/1"
        Then I should receive a response with status code 200
        And the response body should confirm successful deletion

    Scenario: Attempt to delete a nonexistent book
        Given I am an authorized user
        When I send a DELETE request to "/api/books/999999"
        Then I should receive a response with status code 404

    Scenario: Unauthorized user attempts to delete a book
        Given I am an unauthorized user
        When I send a DELETE request to "/api/books/2"
        Then I should receive a response with status code 401

    Scenario: User role cannot delete a book
        Given I am a user with role "user"
        When I send a DELETE request to "/api/books/2"
        Then I should receive a response with status code 403