const {Schema, model} = require('mongoose')

const hostSchema = new Schema({
  avatar_url: String,
  is_pro: Boolean,
  name: String
})

module.exports = model('Host', hostSchema)