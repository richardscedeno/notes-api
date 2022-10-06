// const http = require('http')
require('dotenv').config()
require('./mongo')
const express = require('express')
const cors = require('cors')
const Note = require('./models/Note')

const logger = require('./loggerMiddleware')
const NotFound = require('./middleware/NotFound')
const handleErrors = require('./middleware/handleErrors')

const usersRouter = require('./controllers/users')
const User = require('./models/User')

const app = express()

app.use(cors())
app.use(express.json())

// Usando middleware
app.use(logger)

app.get('/', (request, response) => {
  response.send('<h1>API NOTES</h1>')
})

app.get('/api/notes', async (request, response) => {
  const notes = await Note.find({}).populate('userId', {
    username: 1,
    name: 1
  })
  response.json(notes)
})

app.get('/api/notes/:id', (request, response, next) => {
  const { id } = request.params

  Note.findById(id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  const note = request.body

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then(result => {
      response.json(result)
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', async (request, response, next) => {
  const { id } = request.params

  try {
    await Note.findByIdAndDelete(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.post('/api/notes', async (request, response, next) => {
  const { content, important = false, userId } = request.body

  const user = await User.findById(userId)

  if (!content) {
    return response.status(400).json({
      error: 'required "content" field is missing'
    })
  }

  console.log('user-id: ', user._id)
  const newNote = new Note({
    content,
    date: new Date(),
    important,
    userId: user._id
  })

  // newNote.save()
  //   .then(savedNote => {
  //     response.json(savedNote)
  //   }).catch(error => next(error))

  try {
    const savedNote = await newNote.save()

    user.notes = user.notes.concat(savedNote._id)
    await user.save()

    response.json(savedNote)
  } catch (error) {
    next(error)
  }
})

app.use('/api/users', usersRouter)

app.use(NotFound)
app.use(handleErrors)

const PORT = process.env.PORT || 3001

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
