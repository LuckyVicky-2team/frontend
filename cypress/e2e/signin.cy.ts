/* eslint-disable no-undef */

describe('Signin Page E2E Test', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'POST',
      url: '/api/login',
      statusCode: 200,
      headers: { authorization: 'FAKE_TOKEN' },
    }).as('login');

    cy.visit('/signin');
  });

  it('페이지 로드 확인', () => {
    cy.url().should('include', '/signin');
    cy.contains('로그인').should('be.visible');

    cy.contains('이메일로 회원가입하기')
      .should('be.visible')
      .closest('a')
      .should('have.attr', 'href', '/signup');
  });

  it('일반 로그인을 통해 로그인 시도 테스트', () => {
    cy.get('input[name="username"]').as('emailInput');
    cy.get('input[name="password"]').as('passwordInput');

    cy.get('@emailInput').type(Cypress.env('DEFAULT_EMAIL'));
    cy.get('@passwordInput').type(Cypress.env('DEFAULT_PASSWORD'));

    cy.get('@emailInput')
      .invoke('val')
      .should('eq', Cypress.env('DEFAULT_EMAIL'));
    cy.get('@passwordInput')
      .invoke('val')
      .should('eq', Cypress.env('DEFAULT_PASSWORD'));

    cy.get('button[type="submit"]').click();

    cy.location('pathname', { timeout: 5000 }).should('include', '/main');
    cy.get('h1').should('contain', '주어진 환경은 다르니까!');
  });
});

// describe('소셜 로그인', () => {
//   beforeEach(() => {
//     cy.loginToAuth0ViaSocial('google');
//     cy.visit('/');
//   });

//   it('navigates to the app after navigation and displays the sample project header', () => {
//     cy.get('h1').should('contain', '주어진 환경은 다르니까!');
//   });
// });
