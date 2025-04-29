const express = require("express");
const router = express.Router();
const LC = require("../controller/language");
const LCD = require("../controller/langdetail"); // Import language detail controller
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

// Language CRUD routes
router.post("/create", upload.single("image"), LC.create);
router.get("/", LC.getAllLanguages);
router.get("/:id", LC.getLanguage);
router.delete("/:id", LC.delete);
router.patch("/:id", upload.single("image"), LC.update);

// Language Detail routes (nested under languages)
router.post("/:id/details", LCD.create); // Create detail for specific language
router.get("/:id/details", LCD.getDetail); // Get language with details

module.exports = router;