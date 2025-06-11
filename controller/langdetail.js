const LanguageDetail = require("../model/langdetail");
const Language = require("../model/language");

// Create language detail
exports.create = async (req, res) => {
  try {
    // Check if language exists
    const language = await Language.findById(req.body.languageId);
    if (!language) {
      return res.status(404).json({
        status: 'error',
        message: 'Language not found'
      });
    }

    // Check if detail already exists for this language
    const existingDetail = await LanguageDetail.findOne({ languageId: req.body.languageId });
    if (existingDetail) {
      return res.status(400).json({
        status: 'error',
        message: 'Language detail already exists for this language'
      });
    }

    // Handle syntax field - convert string to proper structure if needed
    let syntaxData = req.body.syntax;
    if (typeof syntaxData === 'string') {
      syntaxData = {
        overview: syntaxData,
        basicSyntax: {
          variables: '',
          dataTypes: [],
          operators: [],
          controlStructures: '',
          functions: '',
          classes: ''
        },
        advancedConcepts: []
      };
    }

    // Create new language detail with proper structure
    const detail = await LanguageDetail.create({
      languageId: req.body.languageId,
      name: language.name,
      description: req.body.description || language.description,
      introduction: {
        overview: req.body.introduction?.overview || '',
        keyFeatures: req.body.introduction?.keyFeatures || [],
        useCases: req.body.introduction?.useCases || [],
        advantages: req.body.introduction?.advantages || [],
        disadvantages: req.body.introduction?.disadvantages || []
      },
      technicalInfo: {
        paradigms: req.body.technicalInfo?.paradigms || [],
        typingDiscipline: req.body.technicalInfo?.typingDiscipline || '',
        executionModel: req.body.technicalInfo?.executionModel || '',
        memoryManagement: req.body.technicalInfo?.memoryManagement || '',
        concurrencyModel: req.body.technicalInfo?.concurrencyModel || '',
        performance: {
          strengths: req.body.technicalInfo?.performance?.strengths || [],
          limitations: req.body.technicalInfo?.performance?.limitations || []
        }
      },
      syntax: syntaxData,
      codeSnippets: req.body.codeSnippets || []
    });

    res.status(201).json({
      status: 'success',
      message: 'Language detail created successfully',
      data: detail
    });
  } catch (error) {
    console.error('Error creating language detail:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
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

// Get language detail
exports.getDetail = async (req, res) => {
  try {
    const detail = await LanguageDetail.findById(req.params.id)
      .select('-__v')
      .lean();

    if (!detail) {
      return res.status(404).json({
        status: 'error',
        message: 'Language detail not found'
      });
    }

    // Handle string syntax field
    if (typeof detail.syntax === 'string') {
      detail.syntax = {
        overview: detail.syntax,
        basicSyntax: {
          variables: '',
          dataTypes: [],
          operators: [],
          controlStructures: '',
          functions: '',
          classes: ''
        },
        advancedConcepts: []
      };
    }

    res.status(200).json({
      status: 'success',
      data: detail
    });
  } catch (error) {
    console.error('Error fetching language detail:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get language detail by language ID
exports.getDetailByLanguageId = async (req, res) => {
  try {
    const detail = await LanguageDetail.findOne({ languageId: req.params.languageId })
      .lean();

    if (!detail) {
      return res.status(404).json({
        status: "error",
        message: "Language detail not found for this language"
      });
    }

    // Handle string syntax field
    if (typeof detail.syntax === 'string') {
      detail.syntax = {
        overview: detail.syntax,
        basicSyntax: {
          variables: '',
          dataTypes: [],
          operators: [],
          controlStructures: '',
          functions: '',
          classes: ''
        },
        advancedConcepts: []
      };
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
      message: error.message
    });
  }
};

// Update language detail
exports.update = async (req, res) => {
  try {
    const detail = await LanguageDetail.findById(req.params.id);
    
    if (!detail) {
      return res.status(404).json({
        status: 'error',
        message: 'Language detail not found'
      });
    }

    // Handle syntax field if it's a string in the request
    if (typeof req.body.syntax === 'string') {
      req.body.syntax = {
        overview: req.body.syntax,
        basicSyntax: {
          variables: '',
          dataTypes: [],
          operators: [],
          controlStructures: '',
          functions: '',
          classes: ''
        },
        advancedConcepts: []
      };
    }

    // Update only provided fields while maintaining structure
    if (req.body.introduction) {
      detail.introduction = {
        ...detail.introduction,
        ...req.body.introduction
      };
    }

    if (req.body.technicalInfo) {
      detail.technicalInfo = {
        ...detail.technicalInfo,
        ...req.body.technicalInfo,
        performance: {
          ...detail.technicalInfo.performance,
          ...req.body.technicalInfo?.performance
        }
      };
    }

    if (req.body.syntax) {
      detail.syntax = {
        ...detail.syntax,
        ...req.body.syntax,
        basicSyntax: {
          ...detail.syntax.basicSyntax,
          ...req.body.syntax?.basicSyntax
        }
      };
    }

    // Handle other fields that might be updated
    if (req.body.description) detail.description = req.body.description;

    await detail.save();

    res.status(200).json({
      status: 'success',
      message: 'Language detail updated successfully',
      data: detail
    });
  } catch (error) {
    console.error('Error updating language detail:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Delete language detail
exports.delete = async (req, res) => {
  try {
    const detail = await LanguageDetail.findById(req.params.id);
    
    if (!detail) {
      return res.status(404).json({
        status: 'error',
        message: 'Language detail not found'
      });
    }

    await detail.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Language detail deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting language detail:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
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
