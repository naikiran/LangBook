const IQ = require("../model/interviewQestion");

exports.create = async (req, res) => {
  try {
    let codeData = await IQ.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Question created succesfully",
      data: codeData,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
// Get all interview questions
exports.getAll = async (req, res) => {
  try {
    let codeData = await IQ.find();
    res.status(201).json({
      status: "success",
      message: "All data found succesfully",
      data: codeData,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Get questions by language
exports.getQuebyLang = async (req, res) => {
  try {
    let id = req.params.id;
    let codeData = await IQ.findById(id);
    res.status(201).json({
      status: "success",
      message: "Question data found succesfully",
      data: codeData,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const question = await IQ.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({
        status: "fail",
        message: "Question not found",
      });
    }
    res.status(204).json({
      status: "success",
      message: "Question deleted successfully",
      data: codeData,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const question = await IQ.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!question) {
      return res.status(404).json({
        status: "fail",
        message: "Question not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Question updated successfully",
      data: question,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

