describe('My First Test', () => {
    it('It is only a test!', () => {
        expect(true).to.equal(true)
    })

    it('Visits my application page', () => {
        cy.visit('/')
    })

})