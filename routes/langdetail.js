const express = require("express");
const router = express.Router();
const LCD = require("../controller/langdetail");

// Base CRUD routes
router.post("/create", LCD.create);
router.get("/", LCD.getAll);
router.get("/:id", LCD.getDetail);
router.put("/:id", LCD.update);
router.delete("/:id", LCD.delete);

// Advanced query routes
router.get("/search/query", LCD.search);
router.get("/stats/overview", LCD.getStatistics);
router.get("/related/:id", LCD.getRelatedLanguages);

// Language-specific routes
router.get("/language/:languageId", LCD.getDetailByLanguageId);

module.exports = router;