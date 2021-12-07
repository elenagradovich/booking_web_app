const {Router} = require('express')
const router = Router()
const authController = require('../controllers/auth-controller');
const { check } = require('express-validator');
const logout = require('../middleware/logout');

router.post('/signup',
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({
      min: 6
    })
  ],
  authController.signup
)

router.post('/login', 
  [
    check('email').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({
      min: 6
    })
  ],
  authController.login
);

// router.get('/login', 
//   userController.getUsers
// ); для создания ролей в бд

router.get('/logout', authController.logout)

module.exports = router;