/* eslint-disable no-undef */

describe('Email Signup Form E2E', () => {
  beforeEach(() => {
    // API 요청 스텁 설정
    cy.intercept('GET', /\/api\/check-email\?email=.*/, {
      statusCode: 200,
      body: {},
    }).as('emailDupCheck');

    cy.intercept('GET', /\/api\/check-nickname\?nickName=.*/, {
      statusCode: 200,
      body: {},
    }).as('nickNameDupCheck');

    // 약관 데이터 (fixture 파일 활용 또는 직접 작성)
    cy.intercept('GET', `/api/terms-conditions?required=all`, {
      fixture: 'termsConditions.json',
    }).as('getTerms');

    // 회원가입 요청 스텁
    cy.intercept('POST', '/api/signup', {
      statusCode: 200,
      body: {},
    }).as('signup');

    // 회원가입 페이지 방문
    cy.visit('/signup');
    cy.wait('@getTerms'); // 약관 데이터가 로드될 때까지 대기
  });

  it('should complete signup successfully with valid data', () => {
    // 이메일 입력 후 중복확인
    cy.get('input[name="email"]').type('test@example.com');
    cy.contains('중복확인').click();
    cy.wait('@emailDupCheck');

    // 닉네임 입력 후 중복확인
    cy.get('input[name="nickName"]').type('TestUser');
    cy.contains('중복확인').click();
    cy.wait('@nickNameDupCheck');

    // 비밀번호 및 비밀번호 확인 입력
    cy.get('input[name="password"]').type('Password123!');
    cy.get('input[name="passwordCheck"]').type('Password123!');

    // 전체 선택 버튼이 아닌, 개별 약관 버튼만 선택하여 순회
    cy.get('button[type="button"]')
      .not(':contains("전체동의하기")')
      .each($btn => {
        cy.wrap($btn).click();
        cy.wrap($btn).should('have.class', 'checked');
      });

    // 첫번째 단계에서 "확인" 버튼 클릭 → 두번째 단계로 이동
    cy.contains('확인').click();

    // 두번째 단계에서 PR 태그를 등록하거나 건너뛰기 선택
    // 여기서는 PR 태그 등록 버튼을 클릭하는 예시
    cy.contains('PR 태그 등록하기').click();
    cy.wait('@signup');

    // 회원가입 성공 후 결과 페이지로 리다이렉트 되었는지 확인
    cy.url().should('include', '/signup/result?type=local');
  });

  it('should display an error when email duplication check fails', () => {
    // 이메일 중복확인 API 호출 실패 스텁 (4002 에러 코드)
    cy.intercept('GET', '/api/email-dup-check*', {
      statusCode: 200,
    }).as('emailDupCheckFail');

    // 에러가 발생하는 이메일 입력
    cy.get('input[name="email"]').clear().type('duplicate@example.com');
    cy.contains('중복확인').click();
    cy.wait('@emailDupCheckFail');

    // 에러 메시지 노출 확인
    cy.contains('이미 존재하는 이메일입니다').should('be.visible');
  });

  // 추가적으로 닉네임 중복, 비밀번호 불일치, 필수 약관 미동의 등의 테스트도 작성할 수 있습니다.
});
describe('ConsentForm - 약관 동의 테스트', () => {
  beforeEach(() => {
    // 필요한 API 모킹 설정 및 페이지 방문
    cy.intercept('GET', '/api/terms', { fixture: 'termsConditions.json' }).as(
      'getTerms'
    );
    cy.visit('/signup');
    cy.wait('@getTerms');

    // 필수 입력 필드들도 미리 채워줍니다.
    cy.get('input[name="email"]').type('test@example.com');
    cy.contains('중복확인').click();
    cy.wait('@emailDupCheck');
    cy.get('input[name="nickName"]').type('TestUser');
    cy.contains('중복확인').click();
    cy.wait('@nickNameDupCheck');
    cy.get('input[name="password"]').type('Password123!');
    cy.get('input[name="passwordCheck"]').type('Password123!');
  });

  it('should keep the confirm button disabled if not all required consents are selected', () => {
    // 여기서는 optional인 [선택] 푸시 알림 동의만 클릭합니다.
    cy.contains('[선택] 푸시 알림 동의').click();
    cy.contains('[선택] 푸시 알림 동의').should('have.class', 'checked');

    // 필수 약관 버튼은 클릭하지 않았으므로 "확인" 버튼은 disabled 상태여야 합니다.
    cy.contains('확인').should('be.disabled');
  });

  it('should enable the confirm button when all required consents are selected', () => {
    // 필수 약관들만 클릭합니다.
    cy.contains('[필수] 이용약관 동의').click();
    cy.contains('개인정보 이용 수집 동의(필수)').click();
    cy.contains('위치정보 이용 수집 동의(필수)').click();
    cy.contains('[필수] 본인은 만 14세 이상입니다').click();

    // (optional인 [선택] 푸시 알림 동의는 선택 여부와 관계없이 필수 조건이 아니므로 클릭하지 않아도 됨)

    // 모든 필수 항목이 선택되었으므로 "확인" 버튼은 활성화되어야 합니다.
    cy.contains('확인').should('not.be.disabled');
  });
});
