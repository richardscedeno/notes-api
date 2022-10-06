const { Schema, model } = require('mongoose')

// Crear un esquema de datos
const noteSchema = Schema({
  content: String,
  date: Date,
  important: Boolean,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
}, { versionKey: false /*, timestamps: true */ })

// Se indica como se trasforma el toJSON
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    // delete returnedObject.__v
  }
})

// A la constante le agregamos el modelo con ese esquema definido
const Note = model('notes', noteSchema)

// Creamos una nota, instanciando al modelo antes creado
// const note = new Note({
//   content: 'probando mongodb con mongoose',
//   date: new Date(),
//   important: true
// })

// Guardamos la nota
// note.save()
//   .then(response => {
//     console.log(response)
//     mongoose.connection.close()
//   })
//   .catch(error => {
//     console.log(error)
//   })

// Mostramos nota
// Note.find({})
//   .then(response => {
//     console.log(response)
//     mongoose.connection.close()
//   })

module.exports = Note
