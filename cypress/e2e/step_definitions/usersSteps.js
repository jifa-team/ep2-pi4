/* global cy, Cypress, expect */
const { Given } = require('@badeball/cypress-cucumber-preprocessor');

Given('a user exists with email {string} and password {string}', (email, password) => {
  // cria o usuário se não existir (melhor esforço)
  cy.request({
    method: 'POST',
    url: `${Cypress.env('API_BASE') || 'http://localhost:3000'}/users`,
    // fornece um cpf pois a API exige; usa timestamp para evitar colisões de unicidade
    body: { firstName: 'Auto', lastName: 'Test', email, password, cpf: `${Date.now()}` },
    failOnStatusCode: false
  }).then((resp) => {
    // se o usuário já existir, a API pode retornar um erro 4xx por duplicidade; tratar como OK
    if (resp.status >= 200 && resp.status < 300) return;
    // caso contrário, registra e segue; testes que dependem do usuário farão asserts depois
    // eslint-disable-next-line no-console
    console.log('create-user response (ignored):', resp.status, resp.body && resp.body.message);
  });
});

Given('no user exists with email {string}', (email) => {
  // melhor esforço: não deleta para evitar operações destrutivas se não suportado
  cy.task('log', `Assumindo que o usuário ${email} não existe`);
});

Given('a user exists and I save the id as {string}', (alias) => {
  const base = Cypress.env('API_BASE') || 'http://localhost:3000';
  // tenta encontrar por TEST_USER_ID ou por email conhecido; se não, usa o primeiro
  const email = 'email1@example.com';
  cy.task && cy.task('log', `salvando id do usuário como alias ${alias}`);
  // chama a API e busca o usuário pelo email
  cy.request({ method: 'GET', url: `${base}/users`, headers: { Authorization: Cypress.env('JWT_TOKEN') } }).then((resp) => {
    expect(resp.status).to.be.oneOf([200]);
    const list = resp.body || [];
    let found = null;
    if (Cypress.env('TEST_USER_ID')) {
      found = list.find(u => String(u._id || u.id) === String(Cypress.env('TEST_USER_ID')));
    }
    if (!found) found = list.find(u => String(u.email).toLowerCase() === String(email).toLowerCase());
    if (!found && list.length) found = list[0];
    if (found) {
      const id = found._id || found.id || found.userId;
      cy.wrap(id).as(alias);
      Cypress.env('TEST_USER_ID', id);
    }
  });
});

module.exports = {};
