/// <reference types='cypress' />
/// <reference types='../support' />

// Made by Dawid Antkiewicz
describe('Sign Up page', () => {
  let user;
  const passwordValidation = `Password must be 8 characters long and 
    include 1 number, 1 uppercase letter, and 1 lowercase letter.`;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => { user = generatedUser; });
  });

  // Positive Tests

  it('should register the user with valid data, data is set', () => {
    // Go to the Home Page
    cy.visit('#/');
    // Go to the Sign up Page
    cy.get('a').contains('Sign up').click();
    // Fill in the Register From
    cy.getByDataQa('username_field').type('testuser12');
    cy.getByDataQa('email_field').type('testuser12@test.com');
    cy.getByDataQa('password_field').type('Testing123!');
    cy.get('button').contains('Sign up').click();
    // Assertions
    cy.get('.swal-text')
      .should('contain.text', 'Your registration was successful!');
    cy.get('.nav-item').should('contain.text', 'Settings');
    cy.get('.nav-item').should('contain.text', 'New Article');
    cy.get('.nav-item').should('contain.text', user.username);
  });

  it('should register the user with all valid data', () => {
    // Go to the Home Page
    cy.visit('#/');
    // Go to the Sign up Page
    cy.get('a').contains('Sign up').click();
    // Fill in the Register From
    cy.getByDataQa('username_field').type(user.username);
    cy.getByDataQa('email_field').type(user.email);
    cy.getByDataQa('password_field').type(user.password);
    cy.get('button').contains('Sign up').click();
    // Assertions
    cy.get('.swal-text')
      .should('contain.text', 'Your registration was successful!');
    cy.get('.nav-item').should('contain.text', 'Settings');
    cy.get('.nav-item').should('contain.text', 'New Article');
    cy.get('.nav-item').should('contain.text', user.username);
  });

  // Negative Tests

  // Username Field

  it(`the username field should not accept empty username`, () => {
    // Go to the Home Page
    cy.visit('#/');
    // Go to the Sign up Page
    cy.get('a').contains('Sign up').click();
    // Fill in the form, with empty username
    cy.getByDataQa('email_field').type(user.email);
    cy.getByDataQa('password_field').type(user.password);
    cy.get('button').contains('Sign up').click();
    // Assertions
    cy.get('.swal-modal').should('contain.text', 'Registration failed!');
  });

  it(`the username field should not accept space symbol 
  at the beginning of the username`, () => {
    // Go to the Home Page
    cy.visit('#/');
    // Go to the Sign up Page
    cy.get('a').contains('Sign up').click();
    // Fill in the form, username starts with space symbol
    cy.getByDataQa('username_field').type(` ${user.username}`);
    cy.getByDataQa('email_field').type(user.email);
    cy.getByDataQa('password_field').type(user.password);
    cy.get('button').contains('Sign up').click();
    // Assertions
    cy.get('.swal-modal').should('contain.text', 'Registration failed!');
  });

  it(`the username field should not accept space symbol 
  inside the username`, () => {
    // Go to the Home Page
    cy.visit('#/');
    // Go to the Sign up Page
    cy.get('a').contains('Sign up').click();
    // Fill in the form, space symbol inside the username
    cy.getByDataQa('username_field').type(`${user.username} spaceBeforeMe`);
    cy.getByDataQa('email_field').type(user.email);
    cy.getByDataQa('password_field').type(user.password);
    cy.get('button').contains('Sign up').click();
    // Assertions
    cy.get('.swal-modal').should('contain.text', 'Registration failed!');
  });

  it(`the username field should not accept space symbol 
  at the end of the username`, () => {
    // Go to the Home Page
    cy.visit('#/');
    // Go to the Sign up Page
    cy.get('a').contains('Sign up').click();
    // Fill in the form, space symbol at the end of the username
    cy.getByDataQa('username_field').type(user.username + ' ');
    cy.getByDataQa('email_field').type(user.email);
    cy.getByDataQa('password_field').type(user.password);
    cy.get('button').contains('Sign up').click();
    // Assertions
    cy.get('.swal-modal').should('contain.text', 'Registration failed!');
  });

  // Email field

  it(`the email field should not be empty`, () => {
    // Go to the Home Page
    cy.visit('#/');
    // Go to the Sign up Page
    cy.get('a').contains('Sign up').click();
    // Fill in the form, with empty email
    cy.getByDataQa('username_field').type(user.username);
    cy.getByDataQa('password_field').type(user.password);
    cy.get('button').contains('Sign up').click();
    // Assertions
    cy.get('.swal-modal').should('contain.text', 'Registration failed!');
  });

  it(`the email should contain '@' symbol before the domain name`, () => {
    // Go to the Home Page
    cy.visit('#/');
    // Go to the Sign up Page
    cy.get('a').contains('Sign up').click();
    // Fill in the form, with valid email
    cy.getByDataQa('username_field').type(user.username);
    cy.getByDataQa('email_field').type(user.username + 'gmail.com');
    cy.getByDataQa('password_field').type(user.password);
    cy.get('button').contains('Sign up').click();
    // Assertions
    cy.get('.swal-modal').should('contain.text', 'Registration failed!');
    cy.get('.swal-text').should('contain.text', 'Email must be a valid email.');
  });

  it(`the email should contain '.' symbol in the domain name`, () => {
    // Go to the Home Page
    cy.visit('#/');
    // Go to the Sign up Page
    cy.get('a').contains('Sign up').click();
    // Fill in the form, with valid email
    cy.getByDataQa('username_field').type(user.username);
    cy.getByDataQa('email_field').type(user.username + '@gmailcom');
    cy.getByDataQa('password_field').type(user.password);
    cy.get('button').contains('Sign up').click();
    // Assertions
    cy.get('.swal-modal').should('contain.text', 'Registration failed!');
    cy.get('.swal-text').should('contain.text', 'Email must be a valid email.');
  });

  it(`the email should contain the name part`, () => {
    // Go to the Home Page
    cy.visit('#/');
    // Go to the Sign up Page
    cy.get('a').contains('Sign up').click();
    // Fill in the form, with valid email
    cy.getByDataQa('username_field').type(user.username);
    cy.getByDataQa('email_field').type('@gmailcom');
    cy.getByDataQa('password_field').type(user.password);
    cy.get('button').contains('Sign up').click();
    // Assertions
    cy.get('.swal-modal').should('contain.text', 'Registration failed!');
    cy.get('.swal-text').should('contain.text', 'Email must be a valid email.');
  });

  it(`the email should contain the name part`, () => {
    // Go to the Home Page
    cy.visit('#/');
    // Go to the Sign up Page
    cy.get('a').contains('Sign up').click();
    // Fill in the form, with valid email
    cy.getByDataQa('username_field').type(user.username);
    cy.getByDataQa('email_field').type('@gmailcom');
    cy.getByDataQa('password_field').type(user.password);
    cy.get('button').contains('Sign up').click();
    // Assertions
    cy.get('.swal-modal').should('contain.text', 'Registration failed!');
    cy.get('.swal-text').should('contain.text', 'Email must be a valid email.');
  });

  // Password field

  it(`the password field should not be empty`, () => {
    // Go to the Home Page
    cy.visit('#/');
    // Go to the Sign up Page
    cy.get('a').contains('Sign up').click();
    // Fill in the form, with empty password
    cy.getByDataQa('username_field').type(user.username);
    cy.getByDataQa('email_field').type(user.email);
    cy.get('button').contains('Sign up').click();
    // Assertions
    cy.get('.swal-modal').should('contain.text', 'Registration failed!');
    cy.get('.swal-text').should('contain.text', 'Password field required.');
  });

  it(`the password must be 8 characters long`, () => {
    // Go to the Home Page
    cy.visit('#/');
    // Go to the Sign up Page
    cy.get('a').contains('Sign up').click();
    // Fill in the form, with invalid password
    cy.getByDataQa('username_field').type(user.username);
    cy.getByDataQa('email_field').type(user.email);
    // Type password with 7 characters
    cy.getByDataQa('password_field').type('Test11!');
    cy.get('button').contains('Sign up').click();
    // Assertions
    cy.get('.swal-modal').should('contain.text', 'Registration failed!');
    cy.get('.swal-text').should('contain.text', passwordValidation);
  });

  it(`the password should include one number`, () => {
    // Go to the Home Page
    cy.visit('#/');
    // Go to the Sign up Page
    cy.get('a').contains('Sign up').click();
    // Fill in the form, with invalid password
    cy.getByDataQa('username_field').type(user.username);
    cy.getByDataQa('email_field').type(user.email);
    // Type password with with no number
    cy.getByDataQa('password_field').type('Testing!');
    cy.get('button').contains('Sign up').click();
    // Assertions
    cy.get('.swal-modal').should('contain.text', 'Registration failed!');
    cy.get('.swal-text').should('contain.text', passwordValidation);
  });

  it(`the password should include one uppercase letter`, () => {
    // Go to the Home Page
    cy.visit('#/');
    // Go to the Sign up Page
    cy.get('a').contains('Sign up').click();
    // Fill in the form, with invalid password
    cy.getByDataQa('username_field').type(user.username);
    cy.getByDataQa('email_field').type(user.email);
    // Type password with with no uppercase letter
    cy.getByDataQa('password_field').type('testing1!');
    cy.get('button').contains('Sign up').click();
    // Assertions
    cy.get('.swal-modal').should('contain.text', 'Registration failed!');
    cy.get('.swal-text').should('contain.text', passwordValidation);
  });

  it(`the password should include one lowercase letter`, () => {
    // Go to the Home Page
    cy.visit('#/');
    // Go to the Sign up Page
    cy.get('a').contains('Sign up').click();
    // Fill in the form, with invalid password
    cy.getByDataQa('username_field').type(user.username);
    cy.getByDataQa('email_field').type(user.email);
    // Type password with with no lowercase letter
    cy.getByDataQa('password_field').type('TESTING1!');
    cy.get('button').contains('Sign up').click();
    // Assertions
    cy.get('.swal-modal').should('contain.text', 'Registration failed!');
    cy.get('.swal-text').should('contain.text', passwordValidation);
  });
});
