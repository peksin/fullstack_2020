const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { content: 1, date: 1 })
  
    response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  // jos salasanaa ei olemassa ja/tai pituus alle 3
  if (!(body.password && body.password.length >= 3)) {
    return response.status(400).json({
      error: "password less than 3 characters or doesn't exist"
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter