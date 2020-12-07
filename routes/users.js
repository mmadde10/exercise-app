var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
const auth = require('../auth');

/* GET users listing. */
router.get('/', userController.index);

// POST request for creating user.
router.post('/signup', userController.user_create_post);

// POST request for auth user.
router.post('/signin', userController.user_signin_post);

router.get('/me', auth, async(req, res) => {
  // View logged in user profile
  res.send(req.user)
})

router.post('/me/logout', auth, userController.user_logout_post);

router.post('/me/logoutall', auth, userController.user_logout_all_post);

module.exports = router;