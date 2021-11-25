const Order = require('../models/order');

const getOrdersByUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const orders = await Order.findByUserId(userId);
    res.send(orders);
  } catch (err) {
    return res.status(401).json({message: "Orders not found"})
  }
};

const cancelBooking = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const orders = await Order.findByUserId(userId);
    res.send(orders);
  } catch (err) {
    return res.status(401).json({message: "Orders not found"})
  }
};

module.exports.getOrdersByUser = getOrdersByUser;
module.exports.cancelBooking = cancelBooking;