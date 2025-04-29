const LANGUAGE = require('../model/language');
const LanguageDetail = require('../model/langdetail');

// Create language with detail association
exports.create = async (req, res) => {
  try {
    req.body.image = req.file.path; // Save image path

    // Create the language first (without requiring extra details)
    const language = await LANGUAGE.create({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      image: req.body.image
    });

    res.status(200).json({
      status: "success",
      message: "Language created successfully!",
      data: language
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get all languages with their details
// In your getAllLanguages controller
exports.getAllLanguages = async function(req, res) {
  try {
    const languages = await LANGUAGE.find().lean();
    
    // Add detail IDs to response
    const enhancedLanguages = await Promise.all(languages.map(async lang => {
      const detail = await LanguageDetail.findOne({ languageId: lang._id });
      return {
        ...lang,
        detailId: detail?._id // Add this field
      };
    }));

    res.status(200).json({
      status: 'success',
      message: 'All languages fetched successfully',
      data: enhancedLanguages
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
}

// Get single language with full details
exports.getLanguage = async function(req, res) {
  try {
    const language = await LANGUAGE.findById(req.params.id);
    
    if (!language) {
      return res.status(404).json({
        status: 'fail',
        message: 'Language not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Language found successfully',
      data: language
    });
    
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
}

// Delete language and its detail
exports.delete = async function(req, res) {
  try {
    const language = await LANGUAGE.findByIdAndDelete(req.params.id);
    
    if (!language) {
      return res.status(404).json({
        status: 'fail',
        message: 'Language not found'
      });
    }

    // Also delete the associated detail
    await LanguageDetail.findByIdAndDelete(language.languageDetail);

    res.status(200).json({
      status: 'success',
      message: 'Language deleted successfully', 
      data: language
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message
    });
  }
}

// Update remains similar
exports.update = async function(req, res) {
  try {
    const language = await LANGUAGE.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('languageDetail');

    if (!language) {
      return res.status(404).json({
        status: 'fail',
        message: 'Language not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Language updated successfully',
      data: language
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message
    });
  }
}