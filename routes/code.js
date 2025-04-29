var express = require('express');
var router = express.Router();
let codecontroller = require('../controller/code')

/* GET users listing. */
router.post('/create', codecontroller.create);
router.get('/FoundAll', codecontroller.foundalldata);
router.get('/:id', codecontroller.userData);
router.delete('/:id', codecontroller.userdelete);
router.patch('/:id', codecontroller.userupdate);

module.exports = router;
