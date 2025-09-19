/* global cy, Cypress, expect */
const { When, Then } = require('@badeball/cypress-cucumber-preprocessor');

// helper para resolver placeholders como {{userId}} usando Cypress.env ou aliases salvos
function resolvePlaceholdersInString(str) {
  const matches = [...str.matchAll(/{{\s*([^}]+)\s*}}/g)].map(m => m[1]);
  // unique
  const names = [...new Set(matches)];
  if (!names.length) return cy.wrap(str);

  // processa sequencialmente para permitir chamadas cy.get(alias)
  return names.reduce((chain, name) => {
    return chain.then((current) => {
      const envVal = Cypress.env(name);
      if (envVal !== undefined) {
        return current.replace(new RegExp(`{{\\s*${name}\\s*}}`, 'g'), envVal);
      }
      // try to read alias
      return cy.get(`@${name}`).then((val) => current.replace(new RegExp(`{{\\s*${name}\\s*}}`, 'g'), val));
    });
  }, cy.wrap(str));
}

function resolvePlaceholdersInObject(obj) {
  const str = JSON.stringify(obj);
  return resolvePlaceholdersInString(str).then(res => JSON.parse(res));
}

// retorna um chainable cy que produz a string do cabeçalho Authorization ou null
function getAuthHeaderChain() {
  const envHeader = Cypress.env('JWT_TOKEN');
  // se envHeader for string no formato 'Bearer ...', usa ele
  if (typeof envHeader === 'string') return cy.wrap(envHeader);
  // se envHeader for um objeto, tenta extrair token/data
  if (envHeader && typeof envHeader === 'object') {
    const maybe = envHeader.token || (envHeader.data && envHeader.data.token) || envHeader.data;
    if (typeof maybe === 'string') return cy.wrap(maybe.startsWith('Bearer') ? maybe : `Bearer ${maybe}`);
  }
  // tenta variável de ambiente com token bruto
  const raw = Cypress.env('JWT_TOKEN_RAW');
  if (typeof raw === 'string') return cy.wrap(`Bearer ${raw}`);
  // tenta alias armazenado em 'jwtToken'
  return cy.get('@jwtToken', { log: false }).then((aliasVal) => {
    if (!aliasVal) return null;
    if (typeof aliasVal === 'string') return aliasVal.startsWith('Bearer') ? aliasVal : `Bearer ${aliasVal}`;
    if (aliasVal && typeof aliasVal === 'object') {
      const candidate = aliasVal.token || (aliasVal.data && aliasVal.data.token) || aliasVal.data;
      if (typeof candidate === 'string') return candidate.startsWith('Bearer') ? candidate : `Bearer ${candidate}`;
      // fallback to stringifying
      return `Bearer ${String(candidate || aliasVal)}`;
    }
    return null;
  }).catch(() => null);
}

When('I login with email {string} and password {string}', (email, password) => {
  const base = Cypress.env('API_BASE') || 'http://localhost:3000';
  cy.request({
    method: 'POST',
    url: `${base}/api/auth`,
    failOnStatusCode: false,
    body: { email, password }
  }).as('lastResponse');
});

When('I request GET {string}', (path) => {
  const base = Cypress.env('API_BASE') || 'http://localhost:3000';
  resolvePlaceholdersInString(path).then((resolvedPath) => {
    getAuthHeaderChain().then((token) => {
      if (token) cy.task && cy.task('log', `GET ${resolvedPath} Authorization: ${token}`);
      cy.request({ method: 'GET', url: `${base}${resolvedPath}`, failOnStatusCode: false, headers: token ? { Authorization: token } : {} }).as('lastResponse');
    });
  });
});

When('I request GET {string} without token', (path) => {
  const base = Cypress.env('API_BASE') || 'http://localhost:3000';
  resolvePlaceholdersInString(path).then((resolvedPath) => {
    cy.request({ method: 'GET', url: `${base}${resolvedPath}`, failOnStatusCode: false }).as('lastResponse');
  });
});

When('I request POST {string} with body:', (path, dataTable) => {
  const base = Cypress.env('API_BASE') || 'http://localhost:3000';
  const obj = {};
  dataTable.rowsHash && Object.assign(obj, dataTable.rowsHash());
  // resolve placeholders in path and body
  resolvePlaceholdersInString(path).then((resolvedPath) => {
    resolvePlaceholdersInObject(obj).then((finalObj) => {
      // ensure cpf for user creation endpoints when not provided
      if (resolvedPath && resolvedPath.match(/\/?users\/?$/) && !finalObj.cpf) {
        finalObj.cpf = `${Date.now()}`;
      }
      getAuthHeaderChain().then((token) => {
        if (token) cy.task && cy.task('log', `POST ${resolvedPath} Authorization: ${token}`);
        cy.request({ method: 'POST', url: `${base}${resolvedPath}`, body: finalObj, headers: token ? { Authorization: token } : {}, failOnStatusCode: false }).as('lastResponse');
      });
    });
  });
});

When('I request PATCH {string} with body:', (path, dataTable) => {
  const base = Cypress.env('API_BASE') || 'http://localhost:3000';
  const obj = {};
  dataTable.rowsHash && Object.assign(obj, dataTable.rowsHash());
  resolvePlaceholdersInString(path).then((resolvedPath) => {
    resolvePlaceholdersInObject(obj).then((finalObj) => {
      getAuthHeaderChain().then((token) => {
        cy.request({ method: 'PATCH', url: `${base}${resolvedPath}`, body: finalObj, headers: token ? { Authorization: token } : {}, failOnStatusCode: false }).as('lastResponse');
      });
    });
  });
});

When('I request PUT {string} with body:', (path, dataTable) => {
  const base = Cypress.env('API_BASE') || 'http://localhost:3000';
  const obj = {};
  dataTable.rowsHash && Object.assign(obj, dataTable.rowsHash());
  resolvePlaceholdersInString(path).then((resolvedPath) => {
    resolvePlaceholdersInObject(obj).then((finalObj) => {
      getAuthHeaderChain().then((token) => {
        cy.request({ method: 'PUT', url: `${base}${resolvedPath}`, body: finalObj, headers: token ? { Authorization: token } : {}, failOnStatusCode: false }).as('lastResponse');
      });
    });
  });
});

When('I request DELETE {string}', (path) => {
  const base = Cypress.env('API_BASE') || 'http://localhost:3000';
  resolvePlaceholdersInString(path).then((resolvedPath) => {
    getAuthHeaderChain().then((token) => {
      cy.request({ method: 'DELETE', url: `${base}${resolvedPath}`, headers: token ? { Authorization: token } : {}, failOnStatusCode: false }).as('lastResponse');
    });
  });
});

Then('the response status should be {int}', (status) => {
  cy.get('@lastResponse').its('status').should('eq', status);
});

Then('the response should contain a JWT token', () => {
  cy.get('@lastResponse').its('body').then((body) => {
    // token may be in body.token or body.data.token
    const token = body && (body.token || (body.data && body.data.token) || body.data);
    expect(token, 'JWT token presence').to.exist;
  });
});

Then('the response should be a JSON array', () => {
  cy.get('@lastResponse').its('body').should('be.an', 'array');
});

Then('the response should contain field {string}', (field) => {
  cy.get('@lastResponse').its('body').then((body) => {
  const source = (body && (body.user || body.data || body.appointment)) || body;
    expect(source).to.have.property(field);
  });
});

Then('the response should contain field {string} with value {string}', (field, value) => {
  cy.get('@lastResponse').its('body').then((body) => {
    // support different response shapes: { field: v } or { user: { field: v } } or { data: { field: v } }
  const source = (body && (body.user || body.data || body.appointment)) || body;
    expect(source).to.have.property(field);
    expect(String(source[field])).to.eq(value);
  });
});

module.exports = {};
