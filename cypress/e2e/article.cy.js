/* eslint-disable max-len */
/// <reference types='cypress' />
/// <reference types='../support' />

describe('Article', () => {
  let user;
  let article;

  before(() => {
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });
  //  Noemi
  it('should be created [using New Article form]', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    cy.visit('http://localhost:1667/#/editor');
    cy.getByDataQa('article-title').type(article.title);
    cy.getByDataQa('article-description').type(article.description);
    cy.getByDataQa('article-body').type(article.body);
    cy.getByDataQa('publish-btn').click();
    cy.get('h1').should('contain', article.title);
  });
  //  Noemi
  it('should not be created without a title [using New Article form]', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    cy.visit('http://localhost:1667/#/editor');
    cy.getByDataQa('article-description').type(article.description);
    cy.getByDataQa('article-body').type(article.body);
    cy.getByDataQa('publish-btn').click();
    cy.get('.swal-modal').should('contain', 'Oops!');
  });
  //  Noemi
  it('should be edited using Edit button in the banner', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    cy.get('@userID').then((userID) => {
      cy.createArticle(article.title, article.description, article.body, userID);
    });
    cy.visit(`http://localhost:1667/#/articles/${article.title}`);
    cy.get(`.banner [data-qa="edit-btn"]`).click();
    cy.getByDataQa('article-title').clear().type('test');
    cy.getByDataQa('publish-btn').click();
    cy.get('h1').should('contain', 'test');
  });
  //  Noemi
  it('should not be edited when title is empty', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    cy.get('@userID').then((userID) => {
      cy.createArticle(article.title, article.description, article.body, userID);
    });
    cy.visit(`http://localhost:1667/#/articles/${article.title}`);
    cy.get(`.banner [data-qa="edit-btn"]`).click();
    cy.getByDataQa('article-title').clear();
    cy.getByDataQa('publish-btn').click();
    cy.get('.swal-modal').should('contain', 'Oops!');
  });
  //  Noemi
  it('should be edited using Edit button in the body', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    cy.get('@userID').then((userID) => {
      cy.createArticle(article.title, article.description, article.body, userID);
    });
    cy.visit(`http://localhost:1667/#/articles/${article.title}`);
    cy.get(`.container.page [data-qa="edit-btn"]`).click();
    cy.getByDataQa('article-title').clear().type('test');
    cy.getByDataQa('publish-btn').click();
    cy.get('h1').should('contain', 'test');
  });
  //  Noemi
  it('should be deleted using Delete button in the banner', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    cy.get('@userID').then((userID) => {
      cy.createArticle(article.title, article.description, article.body, userID);
    });
    cy.visit(`http://localhost:1667/#/articles/${article.title}`);
    cy.get(`.banner [data-qa="delete-btn"]`).click();
    cy.get('.swal-text').should('contain', 'Deleted the article. Going home...');
  });
  //  Noemi
  it('should be deleted using Delete button in the body', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    cy.get('@userID').then((userID) => {
      cy.createArticle(article.title, article.description, article.body, userID);
    });
    cy.visit(`http://localhost:1667/#/articles/${article.title}`);
    cy.get(`.container.page [data-qa="delete-btn"]`).click();
    cy.get('.swal-text').should('contain', 'Deleted the article. Going home...');
  });
});
