describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('mluukkai logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('maluukkai')
      cy.get('#password').type('slaine')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'wrong username or password')
      
      cy.get('html').should('not.contain', 'mluukkai logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      // klikkaa new blog -napista
      // cy.get('button')
      cy.contains('new blog').click()

      cy.get('#title').type('testattava blogi')
      cy.get('#author').type('testaava kirjailija')
      cy.get('#url').type('www.testiurli.ru')
      cy.get('button').contains('create').click()
      cy.get('html').contains('testattava blogi testaava kirjailija')
    })

    it('A blog can be liked', function() {
      // luodaan blogi tykkaysta varten
      cy.contains('new blog').click()
      cy.get('#title').type('testattava blogi')
      cy.get('#author').type('testaava kirjailija')
      cy.get('#url').type('www.testiurli.ru')
      cy.get('button').contains('create').click()

      // klikkaa view-nappia
      cy.contains('view').click()

      cy.get('#blog-info').contains('likes 0')
      cy.get('#like-button').click()
      cy.get('#blog-info').contains('likes 1')
    })

    it('A blog can be removed by a logged in user', function() {
            // luodaan blogi tykkaysta varten
            cy.contains('new blog').click()
            cy.get('#title').type('testattava blogi')
            cy.get('#author').type('testaava kirjailija')
            cy.get('#url').type('www.testiurli.ru')
            cy.get('button').contains('create').click()
      
            // klikkaa view-nappia
            cy.contains('view').click()
            cy.get('#removeBlogButton').click()
            cy.get('#bloglist').should('not.contain', 'testattava blogi')
    })

    it('Blogs are sorted by likes, most liked blog coming first', function() {
      // luodaan kolme blogia custom-komennolla *krohom*
      cy.createBlog({title: 'blogi1', author: 'authori', url: 'urli.commercial', likes: '10'})
      cy.createBlog({title: 'blogi2', author: 'authori', url: 'urli.commercial', likes: '20'})
      cy.createBlog({title: 'blogi3', author: 'authori', url: 'urli.commercial', likes: '30'})
      cy.visit('http://localhost:3000')

      // etsitaan kaikki blogit
      cy.get('#bloglist > #blog-box').eq(0).should('contain', 'blogi3')
      cy.get('#bloglist > #blog-box').eq(1).should('contain', 'blogi2')
      cy.get('#bloglist > #blog-box').eq(2).should('contain', 'blogi1')
    })
  })
})