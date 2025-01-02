# Feature: Book API Testing

#   Background: 
#     Given the API endpoint is "http://localhost:7081"

#   Scenario: Verify user role cannot create a book
#     Given I am authenticated as "user" with password "password"
#     When I send a POST request to "/api/books" with body:
#       """
#       {
#         "title": "Hansima {datetime}",
#         "author": "My Lord"
#       }
#       """
#     Then the response status code should be 201

#   Scenario: Verify unique IDs are generated
#     Given I am authenticated as "admin" with password "password"
#     When I send a POST request to "/api/books" with body:
#       """
#       {
#         "title": "H.M.Nish {datetime}",
#         "author": "The Story"
#       }
#       """
#     And I send a POST request to "/api/books" with body:
#       """
#       {
#         "title": "N.S.Niluk {datetime}",
#         "author": "Harry"
#       }
#       """
#     Then the response status code should be 201
#     And both books should have different IDs

#   Scenario Outline: Verify error for non-string title or author
#     Given I am authenticated as "admin" with password "password"
#     When I send a POST request to "/api/books" with body:
#       """
#       {
#         "title": 46416416,
#         "author": 5616536
#       }
#       """
#     Then the response status code should be 400

#   Scenario: Verify book creation without id field
#     Given I am authenticated as "admin" with password "password"
#     When I send a POST request to "/api/books" with body:
#       """
#       {
#         "title": "Test Book Without ID {datetime}",
#         "author": "Test Author"
#       }
#       """
#     Then the response status code should be 201
#     And the response should contain an auto-generated id

#   Scenario: Verify error when creating book with duplicate ID
#     Given I am authenticated as "admin" with password "password"
#     When I send a POST request to "/api/books" with body:
#       """
#       {
#         "id": "1234",
#         "title": "Original Book",
#         "author": "Original Author"
#       }
#       """
#     And I send a POST request to "/api/books" with body:
#       """
#       {
#         "id": "1234",
#         "title": "Another Book",
#         "author": "Another Author"
#       }
#       """
#     Then the response status code should be 400