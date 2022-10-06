const supertest = require('supertest')
const { app } = require('../index')
const User = require('../models/User')
const api = supertest(app)

const initialNotes = [
  {
    content: 'Aprendiendo Fullstack',
    date: new Date(),
    important: true
  },
  {
    content: 'Camino hacia fullsatack',
    date: new Date(),
    important: true
  },
  {
    content: 'Otro',
    date: new Date(),
    important: false
  }
]

const getAllContentFromNotes = async () => {
  const response = await api.get('/api/notes')
  return {
    contents: response.body.map(note => note.content),
    response
  }
}

const getUsers = async () => {
  const usersDB = await User.find({})
  return usersDB.map(user => user.toJSON())
}

module.exports = {
  api,
  initialNotes,
  getAllContentFromNotes,
  getUsers
}
