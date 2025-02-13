/// <reference types="cypress" />
// (※ TS를 '모듈'로 인식시키기 위해, 최소 한 번의 export 구문이 필요)
/* eslint-disable no-undef */
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//

//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
/* eslint-disable */
declare global {
  namespace Cypress {
    interface Chainable {
      loginToAuth0ViaSocial(provider: 'google' | 'kakao'): Chainable<void>;
    }
  }
}

function logIntoGoogle(email: string, password: string, name: string) {
  // 1. 예외 처리
  Cypress.on('uncaught:exception', err => {
    return (
      !err.message.includes('ResizeObserver loop') &&
      !err.message.includes('Error in protected function')
    );
  });

  // 2. 내 앱(로컬) 접속 후 로그인 버튼 클릭
  cy.visit('/main');
  cy.get('a[href*="/signin"]').click();

  // 3. Auth0 도메인에서 Google provider 선택
  cy.origin(Cypress.env('domain'), () => {
    cy.scrollTo('bottom');
    cy.get('form[data-provider="google"]').submit();
  });

  // 4. Google 로그인 페이지로 넘어가서 이메일/비번 입력
  cy.origin(
    'https://accounts.google.com',
    {
      args: {
        email,
        password,
      },
    },
    ({ email, password }) => {
      // 다시 uncaught:exception 핸들링
      Cypress.on('uncaught:exception', err => {
        return (
          !err.message.includes('ResizeObserver loop') &&
          !err.message.includes('Error in protected function')
        );
      });

      // 이메일 → 다음 → 비번 → 다음
      cy.get('input[type="email"]').type(email, { log: false });
      cy.contains(/^(다음|Next)$/)
        .click()
        .wait(4000);
      cy.get('[type="password"]').type(password, { log: false });
      cy.contains(/^(다음|Next)$/)
        .click()
        .wait(4000);
    }
  );

  // 5. 내 앱으로 돌아와서 사용자 이름이 표시되는지 확인
  cy.get('h6.dropdown-header').should('contain', name);
}
function logIntoKakao(email: string, password: string, name: string) {}

// 위 함수를 이용해 커스텀 커맨드를 등록
Cypress.Commands.add(
  'loginToAuth0ViaSocial',
  (SOCIAL_PROVIDER: 'google' | 'kakao') => {
    const log = Cypress.log({
      displayName: 'Social LOGIN',
      message: [`🔐 Authenticating | ${SOCIAL_PROVIDER}`],
      // @ts-ignore
      autoEnd: false,
    });
    log.snapshot('before');

    switch (SOCIAL_PROVIDER) {
      case 'google':
        logIntoGoogle(
          Cypress.env('GOOGLE_USERNAME'),
          Cypress.env('GOOGLE_PASSWORD'),
          Cypress.env('GOOGLE_NAME')
        );
        break;
      case 'kakao':
        logIntoKakao(
          Cypress.env('KAKAO_EMAIL'),
          Cypress.env('KAKAO_PASSWORD'),
          Cypress.env('KAKAO_NAME')
        );
        break;
      default:
        throw new Error('no social provider configured!');
    }

    log.snapshot('after');
    log.end();
  }
);

export {};
