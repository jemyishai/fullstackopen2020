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
    cy.request({
      url: 'http://localhost:3001/api/users',
      method: 'POST',
      body: {
        username: 'test_user_1',
        name: 'test_1',
        password: 'test_1',
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
    cy.contains('logout').click()
  })
  it('user who created a blog can delete it', function(){
    cy.contains('view').click()
    cy.contains('remove blog').click()
    // following assertion isn't needed
    cy.on('window:confirm',() => true)
    cy.contains('test logged in')
    cy.get('html').should('contain', 'test logged in').should('not.contain', 'Enzyme Test')
    //Cypress exists in the Cypress script lol
  })
  it('Other users cannot delete the blog', function(){
    //turn this into a function
    cy.contains('New Blog').click()
    cy.get('#title').type('Enzyme Test_2')
    cy.get('#author').type('Cypress_2')
    cy.get('#url').type('https://www.e2e4eva_2.com')
    cy.contains('submit').click()
    cy.contains('logout').click()
    // turn this into a function
    cy.request('POST', 'http://localhost:3001/api/login', {
      username: 'test_user_1',
      password: 'test_1',
    }).then((response) => {
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')
    })
    cy.contains('view').click()
    cy.get('#user-info')
      .should('contain', 'test_user')
      .should('not.contain', 'remove blog')
  })
  it('Orders blogs by number of likes', function(){
    //increase likes of existing blog to 2
    cy.contains('view').click()
    cy.contains('like').click().click()
    //adds new blog & clicks like 4 times
    cy.contains('New Blog').click()
    cy.get('#title').type('Enzyme Test')
    cy.get('#author').type('Cypress')
    cy.get('#url').type('https://www.e2e4eva.com')
    cy.contains('submit').click()
    cy.contains('view').click()
    //need to add better classes names and potentially use a map here
    cy.get(':nth-child(7) > :nth-child(5)').click().click().click().click()
    cy.get(':nth-child(2) > :nth-child(1) > :nth-child(6)')
      .should('contain', 'Likes: 4')
      .should('contain', 'https://www.e2e4eva.com')
    cy.get(':nth-child(2) > :nth-child(1) > :nth-child(7)')
      .should('contain', 'Likes: 2')
      .should('contain', 'Enzyme Test_2')
  })
})

// nested tests
