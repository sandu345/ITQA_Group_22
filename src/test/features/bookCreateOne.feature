Feature: Book API Testing

  Background: 
    Given the API endpoint is "http://localhost:7081"

  Scenario: Verify user role cannot create a book
    Given I am authenticated as "user" with password "password"
    When I send a POST request to "/api/books" with body:
      """
      {
        "title": "QGhjvufruyfviukd",
        "author": "dcyd56ducvuyiol"
      }
      """
    Then the response status code should be 201

  Scenario: Verify unique IDs are generated
    Given I am authenticated as "admin" with password "password"
    When I send a POST request to "/api/books" with body:
      """
      {
        "title": "Bvcvghhjk,lockchain Revolution",
        "author": "Afdfcgvhvghjbklex Nakamoto"
      }
      """
    And I send a POST request to "/api/books" with body:
      """
      {
        "title": "Cyxcvbncgvjhkjberopertatiio",
        "author": "komygbyuijk"
      }
      """
    Then the response status code should be 201
    And both books should have different IDs

  Scenario Outline: Verify error for non-string title or author
    Given I am authenticated as "admin" with password "password"
    When I send a POST request to "/api/books" with body:
      """
      {
        "title": <title>,
        "author": <author>
      }
      """
    Then the response status code should be 400

    Examples:
      | title     | author  |
      | &^**($&^  | &*)*)*_ |



   Scenario: Verify book creation without id field
    Given I am authenticated as "admin" with password "password"
    When I send a POST request to "/api/books" with body:
      """
      {
        "title": "Test Book Without ID",
        "author": "Test Author"
      }
      """
    Then the response status code should be 201
    And the response should contain an auto-generated id