// @ts-check
// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import { InterceptRoutes } from './interceptRoutes';
import { AuthHelpers } from './authHelpers';

before(() => {
  // See comments in cypress/support/e2e.ts.
  // AuthHelpers.getAuthDataAndWriteToFile();
});

beforeEach(() => {
  InterceptRoutes.setInterceptRoutes();
});

// Alternatively you can use CommonJS syntax:
// require('./commands')
