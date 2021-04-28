describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request({
      url: 'http://localhost:3001/api/users',
      method: 'POST',
      body: {
        username: 'test_user',
        name: 'test',
        password: 'test',
      },
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login')
  })
})

describe('Login', function () {
//   it('succeeds with correct credentials', function () {
//     cy.request('POST', 'http://localhost:3003/api/login', {
//       username: 'test_user',
//       password: 'test',
//     }).then((response) => {
//       localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
//       // cy.visit('http://localhost:3000')
//       // cy.get('#logout-button').click()
//     })
//   })

  it('succeeds with the correct credentials', function(){
    cy.get('#username').type('test_user')
    cy.get('#password').type('test')
    cy.get('#login-button').click()
    cy.contains('test logged in')
    cy.get('#logout-button').click()
  })
  it('login fails with wrong password', function() {
    cy.get('#username').type('TESTY')
    cy.get('#password').type('test')
    cy.get('#login-button').click()
    cy.get('.error')
      .should('contain', 'Wrong Credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    cy.get('html').should('not.contain', 'test logged in')
  })
})
describe('Like a blog', function(){
})
