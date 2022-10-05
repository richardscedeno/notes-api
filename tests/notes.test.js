const { mongoose } = require('mongoose')
const { server } = require('../index')
const Note = require('../models/Note')
const { api, initialNotes, getAllContentFromNotes } = require('./helpers')

beforeEach(async () => {
  await Note.deleteMany({})

  const note1 = new Note(initialNotes[0])
  await note1.save()

  const note2 = new Note(initialNotes[1])
  await note2.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(initialNotes.length)
})

test('first note', async () => {
  const { contents } = await getAllContentFromNotes()
  expect(contents).toContain('Aprendiendo Fullstack')
})

test('a valid note can be added', async () => {
  const newNote = {
    content: 'Nueva nota para test',
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const { contents, response } = await getAllContentFromNotes()
  expect(response.body).toHaveLength(initialNotes.length + 1)
  expect(contents).toContain(newNote.content)
})

test('note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(initialNotes.length)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
