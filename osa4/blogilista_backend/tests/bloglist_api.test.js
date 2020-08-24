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

afterAll(() => {
  mongoose.connection.close()
})