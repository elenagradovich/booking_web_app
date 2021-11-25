const {Router} = require('express')
const commentsController = require('../controllers/comments-controller')
const router = Router()
const auth = require('../middleware/auth')

router.get('/comments/:hotel_id', commentsController.getCommentsByHotelId)
router.post('/comments/:hotel_id', auth, commentsController.addNewComment)


module.exports = router