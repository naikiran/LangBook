const express = require("express");
const router = express.Router();
const LCD = require("../controller/langdetail");

// Language Detail CRUD routes
router.post("/create", LCD.create);
router.get("/", LCD.getAll);
router.get("/:id", LCD.getDetail);
router.get("/language/:languageId", LCD.getDetailByLanguageId);
router.put("/:id", LCD.update);
router.delete("/:id", LCD.delete);

module.exports = router;