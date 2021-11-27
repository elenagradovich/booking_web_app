const {Schema, model} = require('mongoose')

const orderSchema = new Schema({
  order: {
    type: Object,
    require: true
  },
  user: {
    type: Schema.Types.ObjectID,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

//Schema.Types.ObjectID - связь таблиц
// mongoDB collection name is lowercased and pluralized
module.exports = model('Order', orderSchema)