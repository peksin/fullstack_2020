const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
describe('when there is initially a blurb of blogs saved', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  // GET-pyynnon testi
  test('the right amount of JSON-blogs is returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  // id-kentta oikein
  test('id-field of returned blogs is actually id, not _id', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.id)
    expect(contents).toBeDefined()
  })

  // POST-pyynnon testi
  test('blogs are added correctly', async () => {
    const newBlog = {
      _id: "5a421aa71q54a676234d17f8",
      title: "testiblogi",
      author: "Edsger W. Testaaja",
      url: "http://www.fi",
      likes: 5000,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain(
      'testiblogi'
    )
  })

  test('if no value is given to likes, it will be 0', async () => {
    const newBlog = {
      _id: "5a421aa71q54a676234d17f8",
      title: "testiblogi",
      author: "Edsger W. Testaaja",
      url: "http://www.fi",
      __v: 0
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
    expect(response.body.likes).toEqual(0)
  })

  test('title and/or url empty => 400 Bad Request', async () => {
    let newBlog = {
      _id: "5a421aa71q54a676234d17f8",
      //title: "testiblogi",
      author: "Edsger W. Testaaja",
      url: "http://www.fi",
      __v: 0
    }

    let response = await api
      .post('/api/blogs')
      .send(newBlog)

    expect(response.status).toEqual(400)

    newBlog = {
      _id: "5a421aa71q54a676234d17f8",
      title: "testiblogi",
      author: "Edsger W. Testaaja",
      // url: "http://www.fi",
      __v: 0
    }

    response = await api
    .post('/api/blogs')
    .send(newBlog)

    expect(response.status).toEqual(400)

    newBlog = {
      _id: "5a421aa71q54a676234d17f8",
      // title: "testiblogi",
      author: "Edsger W. Testaaja",
      // url: "http://www.fi",
      __v: 0
    }

    response = await api
    .post('/api/blogs')
    .send(newBlog)

    expect(response.status).toEqual(400)
  })

  test('deleting blog by id works', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api 
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    expect(blogsAtEnd).not.toContain('React patterns')
  })

  test('blog update by id works', async () => {
    const blogsAtStart = await helper.blogsInDb()
    let blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = 670
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .expect(200)
    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body[0].likes === 670)
  })

  describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('sekretti', 10)
      const user = new User({ username: 'root', passwordHash })

      await user.save()
      console.log(`Saatiin root-kayttaja tallennettua`)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuseri',
        password: 'salainenpassu'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` to be unique')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if password is empty', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuseri',
        password: ''
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain("doesn't exist")

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if password is too short', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuseri',
        password: 'as'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('password less than')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})

