var express = require('express');
var router = express.Router();
let adminController = require('../controller/admin')
let adminAuth = require('../middleware/adminauth')

/* GET users listing. */
router.post('/signup', adminController.signup)
router.post('/login', adminController.login)

module.exports = router;
