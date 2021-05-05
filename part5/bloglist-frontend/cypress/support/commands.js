// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('addUser', ({ username, name, password }) => {
  cy.request({
    url: 'http://localhost:3001/api/users',
    method: 'POST',
    body: {
      username,
      name,
      password,
    },
  })
})

Cypress.Commands.add('typeInUser', (username,password) => {
  cy.get('[data-cy=username]').type(username)
  cy.get('[data-cy=password]').type(password)
  cy.get('[data-cy=app-login]').click()
})

Cypress.Commands.add('loginUser', ({ username, name, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    name,
    password,
  }).then((response) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('addNewBlog', (title, author,url) => {
  cy.get('[data-cy=new-blog-option]').click()
  cy.get('[data-cy=title]').type(title)
  cy.get('[data-cy=author]').type(author)
  cy.get('[data-cy=url]').type(url)
  cy.get('[data-cy=new-blog-submit]').click()
})
