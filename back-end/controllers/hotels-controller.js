const Hotel = require('../models/hotel');

// const HttpError = require('../models/http-error');
// const { mapFilePathToServerUrl, mapImageUrlToLocalFilePath } = require('../util/helpers');

const getAllHotels = async (req, res, next) => {

  try {
    //поиск по БД Hotel.find
    const hotels = await Hotel.find()
    res.send(hotels)
  } catch (e) {
    //return next(new HttpError('Something went wrong, could not find hotels', 500));
  }
  
};


const getHotelById = async (req, res, next) => {
  const hotelId = req.params.id;
  try {
    const hotel = await Hotel.findById(hotelId);
    res.send( hotel );
  } catch (err) {
    return res.status(404).json({message: "Hotel not found"})
  }
};


module.exports.getAllHotels = getAllHotels;
module.exports.getHotelById = getHotelById;


