// terminal 명령어
// npm run dev && npm run cypress
// npm run test

/* eslint-disable no-undef */
describe('Creating a message', () => {
  it('Displays the message in the list ', () => {
    cy.visit('/test/won');
    cy.get('[data-testid="messageText"]').type('New message');

    cy.get('[data-testid="sendButton"]').click();

    cy.get('[data-testid="messageText"]').should('have.value', '');

    cy.contains('New message');
  });
});
