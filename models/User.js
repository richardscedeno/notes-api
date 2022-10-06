const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: String,
  name: String,
  passwordHash: String,
  note: [{
    type: Schema.Types.ObjectId,
    ref: 'notes'
  }]
}, { versionKey: false })

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.passwordHash
  }
})

const User = model('users', userSchema)

module.exports = User
