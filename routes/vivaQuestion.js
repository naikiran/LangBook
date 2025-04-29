var express = require('express');
var router = express.Router();
let VC = require('../controller/vivaQuestion')

router.post('/create', VC.create);
router.get('/FoundAll', VC.foundalldata);
router.get('/:id', VC.userData);
router.delete('/:id', VC.userdelete);
router.patch('/:id', VC.userupdate);

module.exports = router;
