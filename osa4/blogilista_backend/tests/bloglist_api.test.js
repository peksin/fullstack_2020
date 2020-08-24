const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

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
    title: "testiblogi",
    author: "Edsger W. Testaaja",
    url: "http://www.fi",
    __v: 0
  }

  let response = await api
    .post('/api/blogs')
    .send(newBlog)
  
  expect(response.body).toContain('400 Bad Request')

})

afterAll(() => {
  mongoose.connection.close()
})

