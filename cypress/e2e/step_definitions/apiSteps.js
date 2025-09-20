/* global cy, Cypress, expect */
const { Given } = require('@badeball/cypress-cucumber-preprocessor');

Given('the API is running', () => {
  // verificação rápida (smoke check)
  cy.request({
    method: 'GET',
    url: `${Cypress.env('API_BASE') || 'http://localhost:3000'}/`,
    failOnStatusCode: false
  }).then((resp) => {
    // aceita qualquer resposta, apenas garante que o servidor é alcançável
    expect(resp.status).to.be.oneOf([200, 404, 401, 403]);
  });
});

module.exports = {};
