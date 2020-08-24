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
  console.log(`entered test`)
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
  console.log(`got ${response.body.length} blogs`)
})

// id-kentta oikein
test('id-field of returned blogs is actually id, not _id', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.id)
  console.log(contents)
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

  const initialLength = helper.initialBlogs.length

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
})

afterAll(() => {
  mongoose.connection.close()
})

