var express = require('express');
var router = express.Router();
let IQ = require('../controller/interviewQestion')

/* GET users listing. */
router.post("/create", IQ.create);
router.get("/", IQ.getAll);
router.get("/:id", IQ.getQuebyLang);
router.delete("/:id", IQ.delete);
router.put("/:id", IQ.update);
module.exports = router;
