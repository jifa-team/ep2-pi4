const { defineConfig } = require('cypress');
module.exports = defineConfig({
  e2e: {
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/features/**/*.feature',
    async setupNodeEvents(on, config) {
      // configure cucumber preprocessor

        const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
        // use the browserify helper from the cucumber preprocessor so .feature files are handled
        const browserify = require('@cypress/browserify-preprocessor');
        // require the package subpath (the package exposes subpaths via package.json exports)
        const { preprendTransformerToOptions } = require('@badeball/cypress-cucumber-preprocessor/browserify');

      // register the cucumber plugin (it may do async work)
      // ensure preprocessor knows where to find step definitions in our project
      config.env = config.env || {};
      config.env.stepDefinitions = config.env.stepDefinitions || [
        'cypress/e2e/step_definitions/**/*.{js,mjs,ts,tsx}',
        'cypress/e2e/step_definitions.{js,mjs,ts,tsx}',
        'cypress/support/step_definitions/**/*.{js,mjs,ts,tsx}'
      ];

      await addCucumberPreprocessorPlugin(on, config);

      // add a simple task handler used throughout step defs for logging
      on('task', {
        log(message) {
          // keep plugin-friendly logging in Node process
          // eslint-disable-next-line no-console
          console.log('[CYPRESS TASK LOG]', message);
          return null;
        }
      });

      // register browserify preprocessor and prepend the cucumber transformer so
      // .feature files are compiled correctly
      const options = preprendTransformerToOptions(config, browserify.defaultOptions);
      on('file:preprocessor', browserify(options));

      return config;
    },
  },
});