const {Router} = require('express')
const router = Router()
const authController = require('../controllers/auth-controller');
const { check } = require('express-validator');


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

router.delete('/logout', async (req, res) => {
  //req.session.isAuthenticated = false === req.session.destroy
  req.session.destroy()
  res.status(204).send({message: "No Content"})
})

module.exports = router;