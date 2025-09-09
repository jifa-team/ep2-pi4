Feature: Usuários

  Background:
    Given the API is running
    And I have a valid JWT token for email "email1@example.com"

  Scenario: Listar todos os usuários (autenticado)
    When I request GET "/users"
    Then the response status should be 200
    And the response should be a JSON array

  Scenario: Buscar usuário por ID (autenticado)
    Given a user exists and I save the id as "userId"
    When I request GET "/users/{{userId}}"
    Then the response status should be 200
    And the response should contain field "email" with value "email1@example.com"

  Scenario: Criar usuário (público)
    When I request POST "/users" with body:
      | firstName | Teste |
      | lastName  | User  |
      | email     | new@example.com |
      | password  | senha123 |
    Then the response status should be 201
    And the response should contain field "email" with value "new@example.com"

  Scenario: Atualizar usuário (autenticado)
    Given a user exists and I save the id as "userId"
    When I request PATCH "/users/{{userId}}" with body:
      | firstName | Atualizado |
    Then the response status should be 200
    And the response should contain field "firstName" with value "Atualizado"

  Scenario: Deletar usuário (autenticado)
    Given a user exists and I save the id as "userId"
    When I request DELETE "/users/{{userId}}"
    Then the response status should be 200
