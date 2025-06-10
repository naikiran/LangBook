var express = require('express');
var router = express.Router();
let CC = require('../controller/category')


/* GET users listing. */
router.post('/create', CC.create);
router.get('/', CC.foundalldata);
router.get('/:id', CC.found);
router.delete('/:id', CC.delete);
router.patch('/:id', CC.update);

module.exports = router;
