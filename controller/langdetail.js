const LanguageDetail = require("../model/langdetail");
const Language = require("../model/language");

// Create a new language detail
exports.create = async (req, res) => {
  try {
    // First check if language exists
    const language = await Language.findById(req.body.languageId);
    if (!language) {
      return res.status(404).json({
        status: "error",
        message: "Language not found"
      });
    }

    // Create language detail
    const languageDetail = new LanguageDetail(req.body);
    await languageDetail.save();

    // Update language with reference to detail
    language.languageDetail = languageDetail._id;
    await language.save();

    res.status(201).json({
      status: "success",
      message: "Language detail created successfully",
      data: languageDetail
    });
  } catch (error) {
    console.error("Error creating language detail:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Error creating language detail"
    });
  }
};

// Get all language details
exports.getAll = async (req, res) => {
  try {
    const details = await LanguageDetail.find()
      .populate('languageId')
      .sort('-createdAt');

    res.status(200).json({
      status: "success",
      message: "Language details fetched successfully",
      data: details
    });
  } catch (error) {
    console.error("Error fetching language details:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Error fetching language details"
    });
  }
};

// Get language detail by ID
exports.getDetail = async (req, res) => {
  try {
    const detail = await LanguageDetail.findById(req.params.id)
      .populate('languageId');

    if (!detail) {
      return res.status(404).json({
        status: "error",
        message: "Language detail not found"
      });
    }

    res.status(200).json({
      status: "success",
      message: "Language detail fetched successfully",
      data: detail
    });
  } catch (error) {
    console.error("Error fetching language detail:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Error fetching language detail"
    });
  }
};

// Get language detail by language ID
exports.getDetailByLanguageId = async (req, res) => {
  try {
    const detail = await LanguageDetail.findOne({ languageId: req.params.languageId })
      .populate('languageId');

    if (!detail) {
      return res.status(404).json({
        status: "error",
        message: "Language detail not found for this language"
      });
    }

    res.status(200).json({
      status: "success",
      message: "Language detail fetched successfully",
      data: detail
    });
  } catch (error) {
    console.error("Error fetching language detail:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Error fetching language detail"
    });
  }
};

// Update language detail
exports.update = async (req, res) => {
  try {
    const detail = await LanguageDetail.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('languageId');

    if (!detail) {
      return res.status(404).json({
        status: "error",
        message: "Language detail not found"
      });
    }

    res.status(200).json({
      status: "success",
      message: "Language detail updated successfully",
      data: detail
    });
  } catch (error) {
    console.error("Error updating language detail:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Error updating language detail"
    });
  }
};

// Delete language detail
exports.delete = async (req, res) => {
  try {
    const detail = await LanguageDetail.findById(req.params.id);
    if (!detail) {
      return res.status(404).json({
        status: "error",
        message: "Language detail not found"
      });
    }

    // Remove reference from language
    await Language.findByIdAndUpdate(detail.languageId, {
      $unset: { languageDetail: "" }
    });

    // Delete the detail
    await detail.remove();

    res.status(200).json({
      status: "success",
      message: "Language detail deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting language detail:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Error deleting language detail"
    });
  }
};

// Search language details
exports.search = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {
      $text: { $search: searchQuery }
    };

    const [results, total] = await Promise.all([
      LanguageDetail.find(query)
        .populate("languageId")
        .skip(skip)
        .limit(limit)
        .sort({ score: { $meta: "textScore" } }),
      LanguageDetail.countDocuments(query)
    ]);

    res.status(200).json({
      status: "success",
      message: "Search results fetched successfully",
      data: {
        results,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get language statistics
exports.getStatistics = async (req, res) => {
  try {
    const stats = await LanguageDetail.aggregate([
      {
        $group: {
          _id: null,
          totalLanguages: { $sum: 1 },
          paradigmCount: { $addToSet: "$technicalInfo.paradigms" },
          frameworkCount: { $sum: { $size: "$tooling.frameworks" } },
          averageCodeSnippets: { $avg: { $size: "$codeSnippets" } }
        }
      },
      {
        $project: {
          _id: 0,
          totalLanguages: 1,
          uniqueParadigms: { $size: "$paradigmCount" },
          totalFrameworks: "$frameworkCount",
          averageCodeSnippets: { $round: ["$averageCodeSnippets", 1] }
        }
      }
    ]);

    res.status(200).json({
      status: "success",
      message: "Statistics fetched successfully",
      data: stats[0]
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get related languages
exports.getRelatedLanguages = async (req, res) => {
  try {
    const detail = await LanguageDetail.findById(req.params.id);
    if (!detail) {
      return res.status(404).json({
        status: "fail",
        message: "Language detail not found",
      });
    }

    const relatedLanguages = await LanguageDetail.find({
      $or: [
        { 'technicalInfo.paradigms': { $in: detail.technicalInfo.paradigms } },
        { 'applications.domain': { $in: detail.applications.map(app => app.domain) } }
      ],
      _id: { $ne: detail._id }
    })
    .populate("languageId")
    .limit(5)
    .select('name description languageId');

    res.status(200).json({
      status: "success",
      message: "Related languages fetched successfully",
      data: relatedLanguages
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
