const {Schema, model} = require('mongoose')

const hotelSchema = new Schema({
  bedrooms: Number,
  city: {
      location: {
        latitude: Number,
        longitude: Number,
        zoom: Number
      },
      name: String
    },
  description: String,
  goods: Array,
  host: {
    avatar_url: String,
    id: Number,
    is_pro: Boolean,
    name: String
  },
  images: Array,
  is_favorite: Boolean,
  is_premium: Boolean,
  location: {
    latitude: Number,
    longitude: Number,
    zoom: Number
  },
  max_adults: Number,
  preview_image: String,
  price: Number,
  rating: Number,
  title: String,
  type: String
})

module.exports = model('Hotel', hotelSchema)