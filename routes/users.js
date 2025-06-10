var express = require('express');
var router = express.Router();
let userController = require('../controller/user')

/* GET users listing. */

router.post('/signup', userController.signup)
router.post('/login', userController.login)

module.exports = router;
