/* eslint-disable no-undef */

describe('로그인 성공 테스트', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/login', {
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

  it('일반 로그인을 통해 로그인 시도', () => {
    cy.get('input[name="username"]').as('emailInput');
    cy.get('input[name="password"]').as('passwordInput');

    cy.get('@emailInput').type(Cypress.env('CYPRESS_DEFAULT_EMAIL'));
    cy.get('@passwordInput').type(Cypress.env('CYPRESS_DEFAULT_PASSWORD'));

    cy.get('@emailInput')
      .invoke('val')
      .should('eq', Cypress.env('CYPRESS_DEFAULT_EMAIL'));
    cy.get('@passwordInput')
      .invoke('val')
      .should('eq', Cypress.env('CYPRESS_DEFAULT_PASSWORD'));

    cy.get('button[type="submit"]').click();

    cy.wait('@login');
    cy.location('pathname', { timeout: 5000 }).should('include', '/main');
    cy.get('h1').should('contain', '주어진 환경은 다르니까!');
  });
});
describe('로그인 실패 테스트', () => {
  beforeEach(() => {
    cy.visit('/signin');
  });

  const fillAndSubmit = () => {
    cy.get('input[name="username"]').type('test@serverError.com');
    cy.get('input[name="password"]').type('password');
    cy.get('button[type="submit"]').click();
  };

  it('status 500 에러 상황에서 토스트 메세지 표시 확인', () => {
    cy.intercept('POST', '/api/login', {
      statusCode: 500,
    }).as('loginError');

    fillAndSubmit();

    cy.wait('@loginError');
    cy.contains('button', '로그인에 실패했습니다').should('be.visible');
  });

  it('status 401 에러 상황에서 토스트 메세지 표시 확인', () => {
    cy.intercept('POST', '/api/login', {
      statusCode: 401,
    }).as('loginError');

    fillAndSubmit();

    cy.wait('@loginError');
    cy.contains('button', '아이디나 비밀번호가 올바르지 않습니다').should(
      'be.visible'
    );
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
