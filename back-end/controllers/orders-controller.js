const Order = require('../models/order');
const Hotel = require('../models/hotel');

const getOrdersByUser = async (req, res, next) => {
  const userId = req.userData.userId;
  try {
    const orders = await Order.find({user_id: userId})
    res.send(orders);
  } catch (err) {
    return res.status(403).json({message: "Orders not found"})
  }
};

const addOrderByUser = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId;
    const userId = req.userData.userId;
    const { dateFrom, dateTo, guestsAmount, total } = req.body;
    let hotel = {};
    hotel = await Hotel.findById(hotelId);
    if(!hotel) res.status(403).json({message: "Invalid hotel id"});
    const order = new Order({
      date_from: new Date(dateFrom),
      date_to: new Date(dateTo),
      guests_amount: parseInt(guestsAmount, 10),
      user_id: userId,
      hotel_id: hotelId,
      preview_image: hotel.preview_image,
      price: parseInt(hotel.price, 10),
      total: parseInt(total, 10),
      rating: parseInt(hotel.rating, 10),
      title: hotel.title,
    })
    if(!order) res.status(403).json({message: "Order was not added"});
    await order.save()
    
    const orders = await Order.find({user_id: userId})
    res.send(orders);
  } catch (err) {
    return res.status(403).json({message: "Error with order"})
  }
};

const cancelBooking = async (req, res, next) => {
  try {
    const orders = await Order.findByUserId(userId);
    res.send(orders);
  } catch (err) {
    return res.status(403).json({message: "Orders not found"})
  }
};

module.exports.getOrdersByUser = getOrdersByUser;
module.exports.addOrderByUser = addOrderByUser;
module.exports.cancelBooking = cancelBooking;