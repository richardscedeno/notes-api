const supertest = require('supertest')
const { app } = require('../index')
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
  }
]

const getAllContentFromNotes = async () => {
  const response = await api.get('/api/notes')
  return {
    contents: response.body.map(note => note.content),
    response
  }
}

module.exports = {
  api,
  initialNotes,
  getAllContentFromNotes
}
