const { defineConfig } = require('cypress');
module.exports = defineConfig({
  e2e: {
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/features/**/*.feature',
    setupNodeEvents(on, config) {
      // configure cucumber preprocessor
      const cucumber = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
      const browserify = require('@badeball/cypress-cucumber-preprocessor/browserify');
      cucumber(on, config);
      on('file:preprocessor', browserify(config));
      return config;
    },
  },
});