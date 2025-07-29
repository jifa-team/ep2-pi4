module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": "warn",
  },
  overrides: [
    {
      files: [".eslintrc.js", "cypress.config.js"],
      env: {
        node: true,
      },
    },
    // SEÇÃO PARA O CYPRESS:
    {
      // Aplica estas regras apenas para os arquivos dentro da pasta cypress
      files: ["cypress/**/*.cy.{js,jsx}"],
      // Adiciona o plugin do Cypress
      plugins: ["cypress"],
      // Usa as regras recomendadas do plugin
      extends: ["plugin:cypress/recommended"],
      // Define o ambiente do Cypress para reconhecer globais como 'cy', 'describe', 'it'
      env: {
        "cypress/globals": true,
      },
    },
  ],
};