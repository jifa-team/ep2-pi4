/* global Cypress, cy */
// comandos customizados para testes de API
Cypress.Commands.add('getToken', (email, password) => {
  const base = Cypress.env('API_BASE') || 'http://localhost:3000';
  return cy.request({ method: 'POST', url: `${base}/api/auth`, body: { email, password }, failOnStatusCode: false }).then((resp) => {
    //pega o token do corpo da resposta, considerando diferentes formatos possíveis    
    const token = resp.body && (resp.body.token || (resp.body.data && resp.body.data.token) || resp.body);
    if (!token) throw new Error('Token não retornado');
    // valida se o token é um bearer, se for, adiciona o prefixo
    const header = token.startsWith('Bearer') ? token : `Bearer ${token}`;
    Cypress.env('JWT_TOKEN', header);
    return header;
  });
});

Cypress.Commands.add('getAuthHeader', () => {
  return Cypress.env('JWT_TOKEN');
});
