describe('User management', () => {
  it("shows an error when we don't pass any query parameters", () => {
    cy.visit('/user-management-naive-dont-copy/1-create');
    cy.get('main').should('contain', 'User not created');
  });

  it('performs all CRUD actions to a new user', () => {
    const name = `test-user-${Date.now()}`;
    const favoriteColor = `test-color-${Date.now()}`;
    cy.visit(
      `/user-management-naive-dont-copy/1-create?name=${name}&favoriteColor=${favoriteColor}`,
    );

    cy.get('[data-cy="create-page-created-user-id"]')
      .should('exist')
      .invoke('text')
      .then((createdUserId) => {
        cy.visit(`/user-management-naive-dont-copy/2-read/${createdUserId}`);

        cy.get('main').should('contain', name);

        cy.visit(`/user-management-naive-dont-copy/4-delete/${createdUserId}`);
        cy.get('main').should(
          'contain',
          `User with id ${createdUserId} deleted`,
        );
      });
  });
});
