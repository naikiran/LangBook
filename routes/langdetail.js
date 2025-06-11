const express = require("express");
const router = express.Router();
const langDetailController = require("../controller/langdetail");

// Create new language detail
router.post("/create", langDetailController.create);

// Get all language details
router.get("/", langDetailController.getAll);

// Get language detail by ID
router.get("/:id", langDetailController.getDetail);

// Get language detail by language ID
router.get("/language/:languageId", langDetailController.getDetailByLanguageId);

// Update language detail
router.put("/:id", langDetailController.update);

// Delete language detail
router.delete("/:id", langDetailController.delete);

module.exports = router;