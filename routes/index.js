const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.json({
    status: 'success',
    message: 'Welcome to LangBook API',
    version: '1.0.0'
  });
});

module.exports = router;
