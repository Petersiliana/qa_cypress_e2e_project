
/* eslint-disable comma-dangle */

/* eslint-disable camelcase */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand();

Cypress.Commands.add('getByDataQa', (selector) => {
  cy.get(`[data-qa^="${selector}"]`);
});

Cypress.Commands.add('register', (email, username, password) => {
  cy.request('POST', '/users', {
    email,
    password,
    username,
  }).then((response) => {
    cy.setCookie('drash_sess', response.body.user.token);
    cy.wrap(response.body.user.id).as('userID');
  });
});

Cypress.Commands.add('login', (email, password) => {
  cy.request('POST', '/users/login', {
    user: {
      email,
      password
    }
  }).then((response) => {
    const user = {
      username: response.body.user.username,
      email: response.body.user.email,
      bio: response.body.user.bio,
      effectiveImage:
        'https://static.productionready.io/images/smiley-cyrus.jpg',
      image: response.body.user.image,
      token: response.body.user.token,
    };
    window.localStorage.setItem('user', JSON.stringify(user));
    cy.setCookie('drash_sess', response.body.user.token);
    cy.wrap(response.body.user.id).as('userID');

  });
});

Cypress.Commands.add('createArticle', (title, description, body, author_id) => {
  cy.getCookie('drash_sess').then((token) => {
    const authToken = token.value;

    cy.request({
      method: 'POST',
      url: '/articles',
      body: {
        article: {
          title,
          description,
          body,
          tags: '',
          author_id
        }
      },
      headers: {
        Authorization: `drash_sess=${authToken}`
      }
    });
  });
});
Cypress.Commands.add('loginUsingUI', (email, password) => {
  cy.getByDataQa("email-sign-in").type(email);
  cy.getByDataQa("password-sign-in").type(password);
  cy.getByDataQa("sign-in-btn").click();
});
