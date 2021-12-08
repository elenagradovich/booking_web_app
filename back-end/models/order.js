const {Schema, model} = require('mongoose')

const orderSchema = new Schema({
  date: {
    type: Date,
    default: Date.now()
  },
  date_from: {
    type: Date,
    required: true,
  },
  date_to: {
    type: Date,
    required: true,
  },
  guests_amount: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectID,
    ref: 'User',
    required: true,
  },
  hotel: {
    type: Schema.Types.ObjectID,
    ref: 'Hotel',
    required: true,
  },
  preview_image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})

//Schema.Types.ObjectID - связь таблиц
// mongoDB collection name is lowercased and pluralized
module.exports = model('Order', orderSchema)