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

describe('When Logged in', function(){
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3001/api/login', {
      username: 'test_user',
      password: 'test',
    }).then((response) => {
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')
    })
  })
  it('A blog can be created', function(){
    cy.contains('test logged in')
    //Toggle Issue - access button via ID
    cy.contains('New Blog').click()
    cy.get('#title').type('Enzyme Test')
    cy.get('#author').type('Cypress')
    cy.get('#url').type('https://www.e2e4eva.com')
    cy.contains('submit').click()
    cy.get('.notice')
      .should('contain', 'added')
      .and('have.css', 'color', 'rgb(0, 128, 0)')
    cy.contains('Enzyme Test')
  })
  it('User can like a blog', function (){
    cy.contains('view').click()
    cy.contains('like').click().click()
    cy.contains('Likes: 2')
  })
})

//nested tests
