const LanguageDetail = require("../model/langdetail");

// Create a new language detail
exports.create = async (req, res) => {
  try {
    const languageDetail = await LanguageDetail.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Language detail created successfully!",
      data: languageDetail,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message || "Internal server error",
    });
  }
};

// Get all language details
exports.getAll = async (req, res) => {
  try {
    const details = await LanguageDetail.find().populate("languageId");
    res.status(200).json({
      status: "success",
      message: "All language details fetched successfully",
      data: details,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get a specific language detail by ID
exports.getDetail = async (req, res) => {
  try {
    const detail = await LanguageDetail.findById(req.params.id).populate("languageId");
    if (!detail) {
      return res.status(404).json({
        status: "fail",
        message: "Language detail not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Language detail found successfully",
      data: detail,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Update a language detail
exports.update = async (req, res) => {
  try {
    const updatedDetail = await LanguageDetail.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // Ensures validation rules are applied
    });

    if (!updatedDetail) {
      return res.status(404).json({
        status: "fail",
        message: "Language detail not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Language detail updated successfully",
      data: updatedDetail,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Delete a language detail
exports.delete = async (req, res) => {
  try {
    const detail = await LanguageDetail.findByIdAndDelete(req.params.id);
    if (!detail) {
      return res.status(404).json({
        status: "fail",
        message: "Language detail not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Language detail deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get language detail by language ID
exports.getDetailByLanguageId = async (req, res) => {
  try {
    const detail = await LanguageDetail.findOne({ 
      languageId: req.params.languageId 
    }).populate("languageId");

    if (!detail) {
      return res.status(404).json({
        status: "fail",
        message: "Language detail not found for this language",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Language detail found successfully",
      data: detail,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
