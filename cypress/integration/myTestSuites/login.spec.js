describe('Login', function () {
    const username = 'indirizzo@dominio.it'
    const password = 'Password'

    context('login form', function () {
        beforeEach(function () {
            cy.visit('/')
        })

        it('tests success login', function () {
            cy.get('input[name=username]').type(username)
            cy.get('input[name=password]').type(password)
            cy.get('[data-cy="loginButton"]').click()

            // vai nella pagina "employees"
            cy.url().should('include', '/employees')
        })

        it('wrong password', function () {
            cy.get('input[name=username]').type(username)
            cy.get('input[name=password]').type(password + 1)
            cy.get('[data-cy="loginButton"]').click()

            //mostra messaggio di errore
            cy.window().contains('Username e/o password errati')
            //click sulla modale
            cy.focused().click()

            // rimani nella pagina "login"
            cy.url().should('include', '/login')

        })

        it('empty username', function () {
            // cy.get('input[name=username]').invoke('val', '') Questa riga è per riempire il campo "username" con stringa vuota,
            //ovviamente si può omettere; lo lascio per mostrare che non è possibile il comando .type('') .type vuole sempre un valore
            cy.get('input[name=password]').type(password)
            cy.get('[data-cy="loginButton"]').click()

            //mostra messaggio di errore
            cy.window().contains('Riempire correttamente tutti i campi')
            //click sulla modale
            cy.focused().click()

            // rimani nella pagina "login"
            cy.url().should('include', '/login')


        })
    })
})

