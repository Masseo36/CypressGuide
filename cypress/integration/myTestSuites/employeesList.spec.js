describe('test log-in e home page', () => {

    it('redirects to /employees on success', function () {
        cy.login()

        cy.visit('/employees')

        //verifica se l'url è "employees"
        cy.url().should('include', '/employees')

        //trova il campo "search" e riempilo con "Massimo"
        cy.get('[data-cy="search"]').type('Giovanni', { delay: 100 })

        //trova il bottone "dettagli" e cliccalo
        cy.contains('Dettagli').click()

        //verifica se l'url è esatto
        cy.url().should('include', '/employees/dettagli/381')

        cy.visit('/employees')

        cy.get('[data-cy="list"]').as('lista')

        cy.get('@lista').then((employees) => {
            const employee = employees[1]
        })
    })
})