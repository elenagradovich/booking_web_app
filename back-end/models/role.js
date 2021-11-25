const {Schema, model} = require('mongoose')

const roleSchema = new Schema({
  value: {
    type: String,
    default: "USER",
    unique: true, // creates index for email
  },
})


module.exports = model('Role', roleSchema)