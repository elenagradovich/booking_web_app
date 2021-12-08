const {Router} = require('express')
const router = Router()
const ordersController = require('../controllers/orders-controller');
const auth = require('../middleware/auth')

router.get('/', auth, ordersController.getOrdersByUser)
router.post('/:hotelId', auth, ordersController.addOrderByUser)
router.get('/cancel', auth, ordersController.cancelBooking)
router.get('/constraned_dates/:hotelId', auth, ordersController.getConstranedDatesByHotelId);


module.exports = router