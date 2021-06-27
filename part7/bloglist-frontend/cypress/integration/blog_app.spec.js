describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.addUser( { username: 'test_user', name: 'test', password: 'test' } )
    cy.visit('http://localhost:3000')
    cy.addUser({ username: 'test_user_1', name: 'test_1', password: 'test_1' } )
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with the correct credentials', function(){
      cy.typeInUser('test_user','test')
      cy.get('[data-cy=user]').contains('test_user logged in')
      cy.get('[data-cy=logout]').click()
    })
    it('login fails with wrong password', function() {
      cy.typeInUser('TESTY','test')
      cy.get('[data-cy=notification]')
        .should('contain', 'Wrong Credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'test logged in')
    })
  })

  describe('When Logged in', function(){
    beforeEach(function(){
      cy.loginUser({ username: 'test_user', name: 'test', password: 'test' } )
      cy.addNewBlog('Enzyme Test','Cypress','https://www.e2e4eva.com')
    })
    it('A blog can be created', function(){
      cy.contains('test_user logged in')
      cy.get('[data-cy=notification]')
        .should('contain', 'added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('Enzyme Test')
    })
    it('User can like a blog', function (){
      cy.get('[data-cy="Enzyme Test-Cypress-toggle"]').click()
      cy.get('[data-cy=blog-like]').click().click()
      cy.get('[data-cy="Enzyme Test-Cypress"]').contains('Likes: 2')
      cy.get('[data-cy=logout]').click()
    })
    it('user who created a blog can delete it', function(){
      cy.get('[data-cy="Enzyme Test-Cypress-toggle"]').click()
      cy.get('[data-cy="Enzyme Test-Cypress"] > [data-cy=remove-blog]').click()
      cy.on('window:confirm',() => true)
      cy.contains('test_user logged in')
      cy.get('html').should('contain', 'test_user logged in').should('not.contain', 'https://www.e2e4eva.com')
    })
    it('Other users cannot delete the blog', function(){
      cy.visit('http://localhost:3000')
      cy.addNewBlog('Enzyme Test_2','Cypress_2','https://www.e2e4eva_2.com')
      cy.get('[data-cy=logout]').click()
      // log in other user
      cy.loginUser({ username: 'test_user_1',
        name: 'test',
        password: 'test_1'
      })
      cy.get('[data-cy="Enzyme Test_2-Cypress_2-toggle"]').click()
      cy.get('[data-cy=user]')
        .should('contain', 'test_user_1')
      cy.get('[data-cy="Enzyme Test_2-Cypress_2"]')
        .should('not.contain', 'remove blog')
    })
    it('Orders blogs by number of likes', function(){
      //view and increase likes of existing blog to 2
      cy.visit('http://localhost:3000')
      cy.addNewBlog('Enzyme Test_2','Cypress_2','https://www.e2e4eva_2.com')
      cy.get('[data-cy="Enzyme Test_2-Cypress_2-toggle"]').click()
      cy.get('[data-cy="Enzyme Test_2-Cypress_2"] > [data-cy=blog-like]').click().click()
      //adds new blog & click like 4 times
      cy.contains('view').click()
      cy.get('[data-cy="Enzyme Test-Cypress"] > [data-cy=blog-like]').click().click().click().click()
      cy.get('[data-cy="Enzyme Test-Cypress"]')
        .should('contain', 'Likes: 4')
        .should('contain', 'https://www.e2e4eva.com')
      cy.get('[data-cy="Enzyme Test_2-Cypress_2"]')
        .should('contain', 'Likes: 2')
        .should('contain', 'Enzyme Test_2')
    })
  })
})






