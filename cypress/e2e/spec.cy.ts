/* eslint-disable no-undef */
describe('template spec', () => {
  beforeEach('passes', () => {
    cy.visit('http://localhost:3000/main');
  });

  it('should contain "상황별 추천!" text', () => {
    cy.contains('상황별 추천!', { timeout: 10000 });
  });
});
