var express = require('express');
var router = express.Router();
let IQ = require('../controller/interviewQestion')

/* GET users listing. */
/**
 * @swagger
 * /Interview:
 *   get:
 *     summary: Get all Interview
 *     responses:
 *       200:
 *         description: Success
 */
// app.get('/users', (req, res) => {
//   res.send('User list');
// });

router.post("/create", IQ.create);
router.get("/", IQ.getAll);
router.get("/:id", IQ.getQuebyLang);
router.delete("/:id", IQ.delete);
router.put("/:id", IQ.update);
module.exports = router;
