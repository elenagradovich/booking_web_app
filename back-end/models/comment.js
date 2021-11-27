const {Schema, model} = require('mongoose')

const commentSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now()
  },
  userId: {
    type: Schema.Types.ObjectID,
    ref: 'User',
    required: true,
  },
  hotelId: {
    type: Schema.Types.ObjectID,
    ref: 'Hotel',
    required: true,
  },
})


module.exports = model('Comment', commentSchema)
