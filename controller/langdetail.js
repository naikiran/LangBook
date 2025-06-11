const LanguageDetail = require("../model/langdetail");

// Create a new language detail
exports.create = async (req, res) => {
  try {
    // Add metadata
    req.body.metadata = {
      lastUpdated: new Date(),
      contributors: req.body.metadata?.contributors || [{
        name: "Admin",
        role: "Creator"
      }]
    };

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

// Get all language details with filtering and pagination
exports.getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};
    if (req.query.paradigm) {
      filter['technicalInfo.paradigms'] = req.query.paradigm;
    }
    if (req.query.category) {
      filter['applications.domain'] = req.query.category;
    }

    // Build query
    const query = LanguageDetail.find(filter)
      .populate("languageId")
      .skip(skip)
      .limit(limit)
      .sort({ 'metadata.lastUpdated': -1 });

    // Execute query
    const [details, total] = await Promise.all([
      query.exec(),
      LanguageDetail.countDocuments(filter)
    ]);

    res.status(200).json({
      status: "success",
      message: "Language details fetched successfully",
      data: {
        details,
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

// Get a specific language detail by ID
exports.getDetail = async (req, res) => {
  try {
    const detail = await LanguageDetail.findById(req.params.id)
      .populate("languageId")
      .select(req.query.fields ? req.query.fields.split(',').join(' ') : '');

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
    // Update metadata
    req.body.metadata = {
      ...req.body.metadata,
      lastUpdated: new Date()
    };

    const updatedDetail = await LanguageDetail.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("languageId");

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

// Get language detail by language ID with section filtering
exports.getDetailByLanguageId = async (req, res) => {
  try {
    // Build projection object based on requested sections
    let projection = {};
    if (req.query.sections) {
      const sections = req.query.sections.split(',');
      sections.forEach(section => {
        projection[section] = 1;
      });
    }

    const detail = await LanguageDetail.findOne({ 
      languageId: req.params.languageId 
    })
    .populate("languageId")
    .select(projection);

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
