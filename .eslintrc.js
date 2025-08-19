module.exports = {
  env: {
    browser: true,
    node: true,   // ✅ adiciona suporte ao Node
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
    {
      files: ["cypress/**/*.cy.{js,jsx}"],
      plugins: ["cypress"],
      extends: ["plugin:cypress/recommended"],
      env: {
        "cypress/globals": true,
      },
    },
  ],
};
