/* eslint-disable quotes */
/* eslint-disable max-len */
/// <reference types='cypress' />
/// <reference types='../support' />

// Created by Noemi Fic

import ArticlePageObject from "../support/pages/article.pageObject";

const articlePage = new ArticlePageObject();

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
  //  Positive tests
  it('should be created [using New Article form]', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    cy.visit('http://localhost:1667/#/editor');
    articlePage.typeTitle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);
    articlePage.clickPublishBtn();
    articlePage.titleInBanner().should('contain', article.title);
  });

  it('should be edited using Edit button in the banner', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    cy.get('@userID').then((userID) => {
      cy.createArticle(article.title, article.description, article.body, userID);
    });
    cy.visit(`http://localhost:1667/#/articles/${article.title}`);
    articlePage.clickEditBtnInBanner();
    articlePage.typeTitle('test');
    articlePage.clickPublishBtn();
    articlePage.titleInBanner().should('contain', 'test');
  });

  it('should be edited using Edit button in the body', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    cy.get('@userID').then((userID) => {
      cy.createArticle(article.title, article.description, article.body, userID);
    });
    cy.visit(`http://localhost:1667/#/articles/${article.title}`);
    articlePage.clickEditBtnInContainer();
    articlePage.typeTitle('test');
    articlePage.clickPublishBtn();
    articlePage.titleInBanner().should('contain', 'test');
  });

  it('should be deleted using Delete button in the banner', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    cy.get('@userID').then((userID) => {
      cy.createArticle(article.title, article.description, article.body, userID);
    });
    cy.visit(`http://localhost:1667/#/articles/${article.title}`);
    articlePage.clickDeleteBtnInBanner();
    cy.get('.swal-text').should('contain', 'Deleted the article. Going home...');
  });

  it('should be deleted using Delete button in the body', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    cy.get('@userID').then((userID) => {
      cy.createArticle(article.title, article.description, article.body, userID);
    });
    cy.visit(`http://localhost:1667/#/articles/${article.title}`);
    articlePage.clickDeleteBtnInContainer();
    cy.get('.swal-text').should('contain', 'Deleted the article. Going home...');
  });
  //  Negative test scenerios
  it('should not be created without a title [using New Article form]', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    cy.visit('http://localhost:1667/#/editor');
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);
    articlePage.clickPublishBtn();
    cy.get('.swal-modal').should('contain', 'Oops!');
  });

  //  Bug report no. #1
  it('should not be edited when title is empty', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    cy.get('@userID').then((userID) => {
      cy.createArticle(article.title, article.description, article.body, userID);
    });
    cy.visit(`http://localhost:1667/#/articles/${article.title}`);
    articlePage.clickEditBtnInBanner();
    cy.getByDataQa('article-title').clear();
    articlePage.clickPublishBtn();
    cy.get('.swal-modal').should('contain', 'Oops!');
  });
});
