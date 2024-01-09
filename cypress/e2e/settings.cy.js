/// <reference types='cypress' />
/// <reference types='../support' />

const faker = require('faker');

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password).then(() => {
        cy.login(user.email, user.password);
      });
    });

    cy.visit('/#/settings');
  });

  it('should provide an ability to update username', () => {
    const userName = faker.name.firstName().toLowerCase();

    cy.get('input[data-qa="username-field"]').clear().type(userName);
    cy.get('button[data-qa="update-settings"]').click();
    cy.contains('Update successful!');
  });

  it('should provide an ability to update bio', () => {
    const bio = faker.lorem.paragraph().toLowerCase();
    cy.get('textarea[data-qa="user-bio-field"]').clear().type(bio);
    cy.get('button[data-qa="update-settings"]').click();
    cy.contains('Update successful!');
  });

  it('should provide an ability to update an email', () => {
    const email = faker.internet.email().toLowerCase();

    cy.get('input[data-qa="email-field"]').clear().type(email);
    cy.get('button[data-qa="update-settings"]').click();
    cy.contains('Update successful!');
  });

  it('should provide an ability to update password', () => {
    const password = faker.internet.password();

    cy.get('input[data-qa="password-field"]').clear().type(password);
    cy.get('button[data-qa="update-settings"]').click();
    cy.contains('Update successful!');
  });

  it('should provide an ability to log out', () => {
    cy.get('button[data-qa="logout"]').click();
    cy.get('a[href="/@' + user.username + '"]').should('not.exist');
  });
});
