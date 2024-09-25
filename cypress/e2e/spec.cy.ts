/* eslint-disable no-undef */
describe('template spec', () => {
  beforeEach('passes', () => {
    cy.visit('http://localhost:3000');
  });

  it('should contain "App Router" text', () => {
    cy.contains('App Router');
  });
});
