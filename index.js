// const http = require('http')
const express = require('express')
const cors = require('cors')

const logger = require('./loggerMiddleware')

const app = express()

app.use(cors())
app.use(express.json())

// Usando middleware
app.use(logger)

let notes = [
  {
    id: 1,
    content: 'Contenido 1',
    date: '2022-09-16T01:06:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Contenido 2',
    date: '2022-10-16T05:06:31.098Z',
    important: false
  },
  {
    id: 3,
    content: 'Contenido 3',
    date: '2022-10-16T05:06:31.098Z',
    important: true
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    // response.status(404).end()
    response.status(404).send({ message: 'No existe nota con ese id' }).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  // const id = Number(request.params.id)
  // notes = notes.filter(note => note.id !== id)
  // response.status(204).end()

  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  if (!note) {
    response.status(404).send({ message: 'No existe nota a eliminar con ese id' })
  } else {
    notes = notes.filter(note => note.id !== id)
    response.status(200).send({ message: 'Nota eliminada' }).end()
  }
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }
  // console.log(note)
  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }
  // notes = notes.concat(newNote) // Esta es otra forma de concatenar arrays
  notes = [...notes, newNote]

  response.status(201).json(newNote)
})

app.use((request, response) => {
  response.status(404).json({ error: 'Not Found' })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
