const {Schema, model} = require('mongoose')

const citySchema = new Schema({
    location: {
      latitude: Number,
      longitude: Number,
      zoom: Number,
    },
    name: String,
})

module.exports = model('City', citySchema)