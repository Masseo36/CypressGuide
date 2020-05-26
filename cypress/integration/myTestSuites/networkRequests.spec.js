/// <reference types="cypress" />

context('Network Requests', () => {
    beforeEach(function () {
        cy.login()
        cy.server()
    })

    it('tests cy.route', () => {
        //cy.login()
        cy.fixture('employees.json').as('employees')

        cy.route('GET', 'http://localhost:8080/JerseyHibernateApp/webapi/employees', '@employees').as('employeesList')

        cy.visit('/employees').wait(1)

        // Listen to GET to comments/1
        //cy.route('GET', 'http://localhost:8080/JerseyHibernateApp/webapi/employees').as('employeesList')


        // we have code that gets a comment when
        // the button is clicked in scripts.js
        /* cy.get('.network-btn').click()
 
         // https://on.cypress.io/wait
         cy.wait('@getComment').its('status').should('eq', 200)
 
         // Listen to POST to comments
         cy.route('POST', '/comments').as('postComment')
 
         // we have code that posts a comment when
         // the button is clicked in scripts.js
         cy.get('.network-post').click()
         cy.wait('@postComment').should((xhr) => {
             expect(xhr.requestBody).to.include('email')
             expect(xhr.requestHeaders).to.have.property('Content-Type')
             expect(xhr.responseBody).to.have.property('name', 'Using POST in cy.route()')
         })
 
         // Stub a response to PUT comments/ ****
         cy.route({
             method: 'PUT',
             url: 'comments/*',
             status: 404,
             response: { error: message },
             delay: 500,
         }).as('putComment')
 
         // we have code that puts a comment when
         // the button is clicked in scripts.js
         cy.get('.network-put').click()
 
         cy.wait('@putComment')
 
         // our 404 statusCode logic in scripts.js executed
         cy.get('.network-put-comment').should('contain', message)*/
    })

    it('tests POST method', () => {
        cy.route({       //ho spostato cy.route() in un beforeEach a inizio pagina
            method: 'POST',
            url: 'http://localhost:8080/JerseyHibernateApp/webapi/create',
            response: { success: false } // per non immettere dati reali nel database!
        }).as('newEmployee') // alias di questo cy.route()



        const name = 'Fabrizio'
        const surname = 'Galli'
        const age = 21

        cy.visit('/create') // vado nella pagina create
        cy.get('input[name=name]').type(name) //riempio tutti i campi
        cy.get('input[name=surname]').type(surname)
        cy.get('input[name=age]').type(age)
        cy.contains('Add').click() //clicco sul bottone

        cy.get('@newEmployee') // prendo l'alias
            .its('requestBody') // verifico se i dati inviati sono corretti a quelli inseriti
            .should('deep.equal', {
                name: 'Fabrizio',
                surname: 'Galli',
                age: '21'
            })

        cy.wait('@newEmployee').then((xhr) => {
            expect(xhr.requestBody.name).equal('Fabrizio')
            expect(xhr.requestBody).to.have.property('name', 'Fabrizio')
        })
    })
    it('tests DELETE method', () => {
        cy.route({       //ho spostato cy.route() in un beforeEach a inizio pagina
            method: 'DELETE',
            url: 'http://localhost:8080/JerseyHibernateApp/webapi/delete/*',
            response: { success: false } // per non immettere dati reali nel database!
        }).as('deleteEmployee') // alias di questo cy.route()
        cy.visit('/employees')
        cy.get('[data-cy="search"]').type('Giovanni', { delay: 100 })
        cy.contains('Dettagli').click()

        cy.get('[data-cy="delete"]').click()

        cy.focused().click()
        cy.wait('@deleteEmployee').then(console.log)
    })
})