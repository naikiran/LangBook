const COURSE = require("../model/courses");


exports.create = async (req, res) => {
  try {
    req.body.image = req.file.path;
    // console.log(req.body, req.file); 
    let userData = await COURSE.create(req.body);
    
    res.status(200).json({
      status: "success",
      message: "Course created successfully!",
      userData
    });
  
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.foundAll = async (req, res) => {
  try {
    const courses = await COURSE.find(); // Fetch all courses

    res.status(200).json({
      status: "success",
      message: "All Courses Fetched Successfully",
      data: courses,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const course = await COURSE.findById(id);

    res.status(200).json({
      status: "success",
      message: "Course Found Successfully",
      data: course,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCourse = await COURSE.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Course Deleted Successfully",
      data: deletedCourse,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const imagePath = req.file ? req.file.filename : req.body.image;

    const updatedCourse = await COURSE.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        image: imagePath,
      },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: "Course Updated Successfully",
      data: updatedCourse,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
