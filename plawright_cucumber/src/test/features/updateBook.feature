# Feature: Update the book details

# Background: 
#  Given I have an existing book

#   Scenario: Update a book with valid data
#     Given I am logged in as "admin" user
#     When I update the book with new valid data
#     Then I should get a status code of 200

#   Scenario: Update a book with unauthorized user
#     Given I have invalid credentials
#     When I try to update the book
#     Then I should get a status code of 401

#   Scenario: Update a book with invalid data types
#     Given I am logged in as "admin" user
#     When I update the book with following invalid data
#       | field  | value    |
#       | id     | "abc"    |
#       | title  | 123      |
#       | author | true     |
#     Then I should get a status code of 400
    

#   Scenario: Update a book with user role
#     Given I am logged in as "user" user
#     When I try to update the book with valid data
#     Then I should get a status code of 403
    