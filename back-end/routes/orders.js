const {Router} = require('express')
const router = Router()
const ordersController = require('../controllers/orders-controller');
const auth = require('../middleware/check-auth')

router.get('/', auth, ordersController.getOrdersByUser)

router.get('/cancel', auth, ordersController.cancelBooking)


module.exports = router