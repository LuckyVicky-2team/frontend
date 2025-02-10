/* eslint-disable no-undef */

describe('Signin Page E2E Test', () => {
  beforeEach(() => {
    cy.visit('/signin');
  });

  it('페이지 로드 확인', () => {
    cy.get('main').should('exist');

    cy.contains('로그인').should('be.visible');
  });

  it('이메일로 회원가입 버튼이 제대로 노출되는지 확인', () => {
    cy.contains('이메일로 회원가입하기')
      .should('be.visible')
      .closest('a')
      .should('have.attr', 'href', '/signup');
  });

  it('일반 로그인을 통해 로그인 시도 테스트', () => {
    cy.get('input[name="username"]').type('testmail@naver.com');

    cy.get('input[name="password"]').type('testmail');

    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/main');
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
