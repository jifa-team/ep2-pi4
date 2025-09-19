/* global Cypress, cy */
// comandos customizados para testes de API
Cypress.Commands.add('getToken', (email, password) => {
  const base = Cypress.env('API_BASE') || 'http://localhost:3000';
  return cy.request({ method: 'POST', url: `${base}/api/auth`, body: { email, password }, failOnStatusCode: false }).then((resp) => {
    // pega o token do corpo da resposta, tentando vários formatos
    let token = null;
    if (resp && resp.body) {
      if (typeof resp.body === 'string') token = resp.body;
      else if (resp.body.token) token = resp.body.token;
      else if (resp.body.data && resp.body.data.token) token = resp.body.data.token;
      else if (resp.body.data && typeof resp.body.data === 'string') token = resp.body.data;
      else token = resp.body;
    }
    if (!token) throw new Error('Token não retornado');
    // normalize to string value if token is wrapped inside an object
    if (typeof token !== 'string' && token && (token.token || token.data)) {
      token = token.token || token.data;
    }
    const header = (typeof token === 'string' && token.startsWith('Bearer')) ? token : `Bearer ${String(token)}`;
    // store both raw and header forms
    const raw = (typeof header === 'string') ? header.replace(/^Bearer\s+/i, '') : String(header);
    Cypress.env('JWT_TOKEN', header);
    Cypress.env('JWT_TOKEN_RAW', raw);
    return header;
  });
});

Cypress.Commands.add('getAuthHeader', () => {
  return Cypress.env('JWT_TOKEN');
});
