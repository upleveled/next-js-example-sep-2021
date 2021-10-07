describe('Navigation', () => {
  it('should navigate to most pages and check for some content', () => {
    // Navigate to home page
    cy.visit('http://localhost:3000');

    // Test for element and content on the home page
    cy.get('[data-cy="home-page-h1"]').should('exist');
    cy.get('main').should('contain', 'dark mode');

    // Navigate to about page
    cy.get('[data-cy="header-about-link"]').should('be.visible').click();

    // Test for element and content on the about page
    cy.get('main').should(
      'contain',
      'this is the version with image component',
    );
    // Test whether the image loads
    cy.get('[alt="jace"]')
      .should('be.visible')
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect(
          $img[0].naturalWidth,
          'image has natural width',
        ).to.be.greaterThan(0);
      });
  });
});
