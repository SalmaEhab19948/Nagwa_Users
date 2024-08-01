/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
// module.exports = (on, config) => {
//   // `on` is used to hook into various events Cypress emits
//   // `config` is the resolved Cypress config
// }
// const cucumber = require('cypress-cucumber-preprocessor').default
// module.exports = (on, config) => {
//   on('file:preprocessor', cucumber())
// }

const sqlServer = require('cypress-sql-server');

const cucumber = require('cypress-cucumber-preprocessor').default

const { defineConfig } = require('cypress')

const dbConfig = require('../../cypress.json');


module.exports = (on, config) => {

  var environment = config.env.test_environment

  console.log(environment)

  var tasks

  if (environment === 'beta') {

    tasks = sqlServer.loadDBPlugin(dbConfig.dbBeta);

  }

  else {

    tasks = sqlServer.loadDBPlugin(dbConfig.dbLive);

  }
  on('file:preprocessor', cucumber()),

    on('task', tasks);
}



