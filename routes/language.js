const express = require("express");
const router = express.Router();
const LC = require("../controller/language");
const LCD = require("../controller/langdetail");
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

// Language CRUD routes
router.post("/create", upload.single("image"), LC.create);
router.get("/", LC.getAllLanguages);
router.get("/:id", LC.getLanguage);
router.delete("/:id", LC.delete);
router.put("/:id", upload.single("image"), LC.update);

// Language Detail routes (nested under languages)
router.post("/:id/details", LCD.create);
router.get("/:id/details", LCD.getDetail);

module.exports = router;