const Order = require('../models/order');
const Hotel = require('../models/hotel');

const getOrdersByUser = async (req, res, next) => {
  const userId = req.userData.userId;
  console.log('userId:', userId);
  try {
    const orders = await Order
    .find({user: userId})
    .populate({ path: 'user', select: 'name' })
    .exec()

    console.log('orders:', orders)
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

    // const ordersByHotelId = await Order.find({hotel: hotelId});
    // if(ordersByHotelId.length > 0) {
    //   const isEx = ordersByHotelId.find({date_from: { $lte: {dateFrom} }});
    //   if(isEx) {
    //     if(existOrders && existOrders.length > 0) res.status(400).json({message: "Date booked. Order was not added"});
    //   }
          // $or: [
          //   {
          //     $and: [
          //       { date_from: { $gte: {dateFrom} } },
          //       { date_to: {$lt: {dateFrom} } }
          //     ]
          //   },
          //   {
          //     $and: [
          //       { date_from: { $lt: {dateTo} } },
          //       { date_to: { $gte: {dateTo} } }
          //     ]
          //   }
          // ]
          
    // }
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
    console.log('order was added');
    const orders = await Order
    .find({user: userId})
    .populate({ path: 'userId', select: 'name' })
    .exec()
      
    if(!orders) res.status(400).json({message: "Error with getting orders from DB"});
    console.log('orders:', orders)
    res.status(200).send(orders);
    
  } catch (err) {
    return res.status(400).json({message: `${err}. Error with order`})
  }
};

const cancelBooking = async (req, res, next) => {
  const userId = req.userData.userId;
  const hotelId = req.params.hotelId;
  try {
    const orders = await Order.find({user: userId,  hotel: hotelId});
    res.send(orders);
  } catch (err) {
    return res.status(400).json({message: "Orders not found"})
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