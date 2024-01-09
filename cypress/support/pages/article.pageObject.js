import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByDataQa('article-title');
  }

  get descriptionField() {
    return cy.getByDataQa('article-description');
  }

  get bodyField() {
    return cy.getByDataQa('article-body');
  }

  get publishBtn() {
    return cy.getByDataQa('publish-btn');
  }

  get editBtnInBanner() {
    return cy.get(`.banner [data-qa="edit-btn"]`);
  }

  get editBtnInContainer() {
    return cy.get(`.container.page [data-qa="edit-btn"]`);
  }

  get deleteBtnInBanner() {
    return cy.get(`.banner [data-qa="delete-btn"]`);
  }

  get deleteBtnInContainer() {
    return cy.get(`.container.page [data-qa="delete-btn"]`);
  }

  typeTitle(title) {
    this.titleField
      .clear()
      .type(title);
  }

  typeDescription(description) {
    this.descriptionField
      .type(description);
  }

  typeBody(body) {
    this.bodyField
      .type(body);
  }

  clickPublishBtn() {
    this.publishBtn
      .click();
  }

  titleInBanner() {
    return cy.get('h1');
  }

  clickEditBtnInBanner() {
    this.editBtnInBanner
      .click();
  }

  clickEditBtnInContainer() {
    this.editBtnInContainer
      .click();
  }

  clickDeleteBtnInBanner() {
    this.deleteBtnInBanner
      .click();
  }

  clickDeleteBtnInContainer() {
    this.deleteBtnInContainer
      .click();
  }
}

export default ArticlePageObject;
