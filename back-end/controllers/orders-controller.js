const Order = require('../models/order');
const Hotel = require('../models/hotel');
const mongoose = require('mongoose');
//const { ObjectId } = require('mongodb');

const getOrdersByUser = async (req, res, next) => {
  const userId = req.userData.userId;
  try {
    const orders = await Order
    .find({user: userId})
    .populate({ path: 'user', select: 'name' })
    .exec()

    res.send(orders);
  } catch (err) {
    return res.status(400).json({message: "Orders not found"})
  }
};

const addOrderByUser = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId;
    const userId = req.userData.userId;
    const { dateFrom, dateTo, guestsAmount, total } = req.body;

    const hotel = await Hotel.findById(hotelId);
    if(!hotel) res.status(400).json({message: "Invalid hotel id"});
    const order = new Order({
      date_from: new Date(dateFrom),
      date_to: new Date(dateTo),
      guests_amount: parseInt(guestsAmount, 10),
      user: userId,
      hotel: hotelId,
      total: parseInt(total, 10),
      title: hotel.title,
      preview_image: hotel.preview_image,
      price: parseInt(hotel.price, 10),
      rating: parseInt(hotel.rating, 10),
    })

    if(!order) res.status(400).json({message: "Order was not added"});
    await order.save()
    const orders = await Order
    .find({user: userId})
    .populate({ path: 'userId', select: 'name' })
    .exec()
      
    if(!orders) res.status(400).json({message: "Error with getting orders from DB"});
    res.status(200).send(orders);
    
  } catch (err) {
    return res.status(400).json({message: `${err}. Error with order`})
  }
};

const cancelBooking = async (req, res, next) => {
  const userId = req.userData.userId;
  const _id = mongoose.Types.ObjectId(req.params.orderId);
  
  try {
    const deletedOrder =  await Order.findByIdAndDelete(_id);
    if(deletedOrder) {
      const orders = await Order
      .find({user: userId})
      .populate({ path: 'user', select: 'name' })
      .exec()

      res.send(orders);
    } else {
      return res.status(400).json({message: 'Deleting order  not found'});
    }
  } catch (err) {
    return res.status(400).json({message: `${err}. Error with deleting`});
  }
};

const getConstranedDatesByHotelId = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    const orders = await Order
    .find({hotel: hotelId})
    .exec()

    const dates = orders.map((order) => ({
      from: order.date_from,
      to: order.date_to,
    }))
    res.status(200).send(dates);
  } catch (err) {
    return res.status(400).json({message: "Dates are free"})
  }
}

module.exports.getOrdersByUser = getOrdersByUser;
module.exports.addOrderByUser = addOrderByUser;
module.exports.cancelBooking = cancelBooking;
module.exports.getConstranedDatesByHotelId = getConstranedDatesByHotelId;