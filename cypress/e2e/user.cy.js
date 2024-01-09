/// <reference types='cypress' />
/// <reference types='../support' />

describe('User', () => {
  // let user = {
  //   username: 'test_123',
  //   email: 'test_123@mail.com',
  //   password: '12345Qwert!',
  //   bio: ''
  // };
  let user;
  let user2;
  let article;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateUser').then((generateUser2) => {
      user2 = generateUser2;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });
  // Katrina
  it('should be able to follow the another user', () => {
    cy.register(user.email, user.username, user.password).then((userID) => {
      cy.createArticle(
        article.title,
        article.description,
        article.body,
        userID
      );
      cy.register(user2.email, user2.username, user2.password);
      cy.login(user2.email, user2.password);
      cy.visit(`/#/@${user.username}`);
      cy.getByDataQa('follow_button').click();
      cy.visit(`/#/@${user.username}`);
    });
    cy.getByDataQa('unfollow_button').should('exist');
  });

  // Katrina
  it('should be able to unfollow the followed user', () => {
    cy.register(user.email, user.username, user.password).then((userID) => {
      cy.createArticle(
        article.title,
        article.description,
        article.body,
        userID
      );
      cy.register(user2.email, user2.username, user2.password);
      cy.login(user2.email, user2.password);
      cy.visit(`/#/@${user.username}`);
      cy.getByDataQa('follow_button').click();
      cy.visit(`/#/@${user.username}`);
      cy.getByDataQa('unfollow_button').click();
    });
    cy.getByDataQa('follow_button').should('exist');
  });
});
