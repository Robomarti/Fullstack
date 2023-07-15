describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		const user = {
			name: 'mina tassa',
			username: 'mina2',
			password: 'moi'
		}

		cy.request('POST', 'http://localhost:3003/api/users/', user)
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function() {
		cy.contains('log in to application')
	})

	it('login form can be opened', function() {
		cy.contains('login').click()
	})

	describe('Login',function() {
		it('succeeds with correct credentials', function () {
			cy.contains('login').click()
			cy.get('#username').type('mina2')
			cy.get('#password').type('moi')
			cy.get('#login-button').click()

			cy.contains('mina tassa logged in')
		})

		it('fails with wrong credentials', function () {
			cy.contains('login').click()
			cy.get('#username').type('mina2')
			cy.get('#password').type('hei')
			cy.get('#login-button').click()

			cy.get('.message').contains('wrong credentials')
		})
	})

	describe('when logged in', function() {
		beforeEach(function() {
			cy.request('POST', 'http://localhost:3003/api/login', {
				username: 'mina2', password: 'moi'
			}).then(response => {
				localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
				cy.visit('http://localhost:3000')
			})
		})

		it('A new blog can be created', function() {
			cy.contains('add blog').click()
			cy.get('#title').type('a blog created by cypress')
			cy.get('#author').type('cypress')
			cy.get('#url').type('this website')
			cy.get('#save-button').click()
			cy.contains('a blog created by cypress')
		})
	})
})