const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
    Blog.find({}).then(blogs => {
        res.json(blogs.map(blog => blog.toJSON()))
    })
})

blogsRouter.post('/', (req, res) => {
    const body = req.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    })

    blog.save()
        .then(savedBlog => {
            res.json(savedBlog.toJSON())
        })
})

module.exports = blogsRouter