const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// eristetty middlewareksi
// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.toLowerCase().startsWith('bearer')) {
//         return authorization.substring(7)
//     }
//     return null
// }

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1})
    res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
    const body = req.body
    const token = req.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid '})
    }

    console.log(`${decodedToken}`)
    // id otetaan tokenista, ei post-pyynnossa plaintextina annetusta userId:sta!

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    if (blog.title && blog.url) {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        res.json(savedBlog.toJSON())
    } else {
        res.status(400).end()
    }
})


blogsRouter.delete('/:id', async (req, res) => {
    const token = req.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid'})
    }

    const blog = await Blog.findById(req.params.id)

    if (blog.user.toString() !== decodedToken.id.toString()) {
        return res.status(401).json({ error: "can't delete blogs added by other users"})
    }

    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
    const body = req.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.json(updatedBlog.toJSON())
})


module.exports = blogsRouter