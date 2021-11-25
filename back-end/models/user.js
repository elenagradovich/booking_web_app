const {Schema, model} = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true // creates index for email
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true
  },
  roles: [{
    type: String,
    ref: 'Role',
  }],
  avatar: {
    type: String,
  }
})

// validate that email is unique
userSchema.plugin(uniqueValidator);

module.exports = model('User', userSchema)
