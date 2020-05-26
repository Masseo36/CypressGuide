describe('Http example', () => {

    context('login form', function () {
        before(function () {
            cy.login()
            cy.visit('/create')
        })

        it.skip('GET', function () {
            cy.request({
                method: 'GET',
                url: "https://httpbin.org/get"
            }).then(function (response) {
                expect(response.body).have.property('url')
            })
        })

        it.skip('POST', function () {
            cy.request({
                method: 'POST',
                url: 'https://httpbin.org/post',
                body: {
                    'name': 'Max',
                    'age': '27'
                },
                headers: {
                    'content-type': 'application/json'
                }
            }).then(function (response) {
                expect(response.body).have.property('json')
                expect(response.body.json).to.deep.equal({
                    'name': 'Max',
                    'age': '27'
                })
            })
        })
        it.skip('POST', function () {
            const name = 'Fabrizio'
            const surname = 'Galli'
            const age = 21


            cy.request({
                method: 'POST',
                url: 'https://httpbin.org/post',
                body: {
                    'name': name,
                    'surname': surname,
                    'age': age
                },
                headers: {
                    'content-type': 'application/json'
                }
            }).then(function (response) {
                expect(response.body).have.property('json')
                expect(response.body.json).to.deep.equal({
                    'name': 'Fabrizio',
                    'surname': 'Galli',
                    'age': 21
                })
            })
        })
        it.skip('GET', function () {
            cy.request({
                method: 'GET',
                url: "http://localhost:8080/JerseyHibernateApp/webapi/employees"
            }).then(function (response) {
                assert.equal(response.status, 200)
                expect(response.body).to.not.be.null
            })
        })
        it.skip('POST', function () {
            const name = 'Fabrizio'
            const surname = 'Galli'
            const age = 21

            cy.get('input[name=name]').type(name)
            cy.get('input[name=surname]').type(surname)
            cy.get('input[name=age]').type(age
            )

            //cy.get('[data-cy="addEmployee"]').click()
        })
        it.only('Dscro should be able to login', () => {
            cy.server()
            cy.route('POST', 'http://localhost:8080/JerseyHibernateApp/webapi/create', {
                name: 'Max',
                surname: 'Vit',
                age: 21
            })
        })
    })
})