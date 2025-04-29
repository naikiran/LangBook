const express = require("express");
const router = express.Router();
const CC = require("../controller/courses"); // Course Controller
const multer = require("multer");
const { storage } = require("../config/cloudinary"); // Import Cloudinary storage

const upload = multer({ storage }); // Use Cloudinary storage


  

router.post('/create', upload.single('image'), CC.create);
router.get('/', CC.foundAll);
router.get('/:id', CC.getCourse);
router.delete('/:id', CC.deleteCourse);
router.patch('/:id', upload.single('image'), CC.updateCourse);

module.exports = router;
