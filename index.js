// const http = require('http')
require('dotenv').config()
require('./mongo')
const express = require('express')
const cors = require('cors')

const logger = require('./loggerMiddleware')
const NotFound = require('./middleware/NotFound')
const handleErrors = require('./middleware/handleErrors')

const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

app.use(cors())
app.use(express.json())

// Usando middleware
app.use(logger)

app.get('/', (request, response) => {
  response.send('<h1>API NOTES</h1>')
})

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(NotFound)
app.use(handleErrors)

const PORT = process.env.PORT || 3001

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
