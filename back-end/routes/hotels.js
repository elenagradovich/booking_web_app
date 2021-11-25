const {Router} = require('express')
const router = Router()
const hotelsController = require('../controllers/hotels-controller');

router.get('/', hotelsController.getAllHotels);
router.get('/:id', hotelsController.getHotelById);

module.exports = router