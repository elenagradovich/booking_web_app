const {Schema, model} = require('mongoose')

const hotelSchema = new Schema({
  bedrooms: Number,
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
  type: String,
  description: String,
  goods: Array,
  cityId: {
    type: Schema.Types.ObjectID,
    ref: 'City',
    required: true,
  },
  hostId: {
    type: Schema.Types.ObjectID,
    ref: 'Host',
    required: true,
  },
})

hotelSchema.method('toClient', function() {
  const hotel = this.toObject()
  hotel.id = hotel._id
  delete hotel._id
  
  return hotel
})

module.exports = model('Hotel', hotelSchema)