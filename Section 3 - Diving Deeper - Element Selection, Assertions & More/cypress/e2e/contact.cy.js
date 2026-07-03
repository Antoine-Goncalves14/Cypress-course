/// <reference types='Cypress' />

describe('contact form', () => {
	it('should submit the form', () => {
		cy.visit('http://localhost:5173/about');
		cy.get('[data-cy="contact-input-message"]').type('Hello world!');
		cy.get('[data-cy="contact-input-name"]').type('John Doe');
		cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
		cy.get('[data-cy="contact-btn-submit"]').then((el) => {
			expect(el.attr('disabled')).to.be.undefined;
			expect(el.text()).to.eq('Send Message');
		});
		cy.screenshot();
		cy.get('[data-cy="contact-input-email"]').type('test@example.com{enter}');
		cy.screenshot();
		// cy.get('@submitBtn').contains('Send Message');
		// cy.get('@submitBtn').should('not.have.attr', 'disabled');
		cy.get('@submitBtn').click();
		cy.get('@submitBtn').contains('Sending...');
		cy.get('@submitBtn').should('have.attr', 'disabled');
	});

	it('should validate the form input', () => {
		cy.visit('http://localhost:5173/about');
		cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
		cy.get('@submitBtn').click();
		cy.get('@submitBtn').then((el) => {
			expect(el).to.not.have.attr('disabled');
			expect(el.text()).to.not.equal('Sending...');
		});
		cy.get('@submitBtn').contains('Send Message');
		cy.get('[data-cy="contact-input-message"]').as('inputMessage');
		cy.get('[data-cy="contact-input-name"]').as('inputName');
		cy.get('[data-cy="contact-input-email"]').as('inputEmail');

		cy.get('@inputMessage').focus().blur();
		cy.get('@inputMessage')
			.parent()
			.should('have.attr', 'class')
			.and('match', /invalid/);

		cy.get('@inputName').focus().blur();
		cy.get('@inputName')
			.parent()
			.should('have.attr', 'class')
			.and('match', /invalid/);

		cy.get('@inputEmail').focus().blur();
		cy.get('@inputEmail')
			.parent()
			.should((el) => {
				expect(el.attr('class')).not.to.be.undefined;
				expect(el.attr('class')).to.contains('invalid');
			});
	});
});
