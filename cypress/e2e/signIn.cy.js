
/// <reference types='cypress' />
/// <reference types='../support' />

// Created by Magda Kołaszewska

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.visit('#/login');
  });

  it('should provide an ability to log in with existing credentials', () => {
    cy.register(user.email, user.username, user.password);
    cy.loginUsingUI(user.email, user.password);
    cy.getByDataQa('username-link').should('contains.text', user.username);
  });

  it('should not provide an ability to log in with wrong email format', () => {
    cy.register(user.email, user.username, user.password);
    cy.loginUsingUI('wrong', user.password);
    cy.get('div[role="dialog"]')
      .get('.swal-text')
      .should('have.text', 'Email must be a valid email.');
  });

  it('should not provide an ability to log in with not existing email', () => {
    cy.register(user.email, user.username, user.password);
    cy.loginUsingUI('wrong' + user.email, user.password);
    cy.get('div[role="dialog"]')
      .get('.swal-text')
      .should('have.text', 'Invalid user credentials.');
  });

  it('should not provide an ability to log in with wrong password', () => {
    cy.register(user.email, user.username, user.password);
    cy.loginUsingUI(user.email, 'wrong' + user.password);
    cy.get('div[role="dialog"]')
      .get('.swal-text')
      .should('have.text', 'Invalid user credentials.');
  });
});
