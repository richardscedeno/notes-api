const mongoose = require('mongoose')

const { MONGODB_URI, MONGODB_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test'
  ? MONGODB_URI
  : MONGODB_URI_TEST

// console.log(connectionString)

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Database connect'))
  .catch(error => console.log(error))

process.on('uncaughtException', error => {
  console.log(error)
  mongoose.disconnect()
})
