const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body

  const user = await User.findOne({ username })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    response.status(401).json({
      error: 'Invalid user or password'
    })
  }

  const userForToken = {
    id: user._id,
    username: user.username
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 * 24 * 7 })

  response.send({
    username: user.username,
    name: user.name,
    token
  })
})

module.exports = loginRouter
