const LANGUAGE = require('../model/language');
const LanguageDetail = require('../model/langdetail');

// Create language
exports.create = async (req, res) => {
  try {
    // Handle image path - can be from file upload or direct URL
    const imagePath = req.file ? req.file.path : req.body.image;
    
    if (!req.body.name || !req.body.category || !req.body.description) {
      return res.status(400).json({
        status: 'error',
        message: 'Name, category, and description are required'
      });
    }

    const language = await LANGUAGE.create({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      image: imagePath || 'https://via.placeholder.com/150' // Default image if none provided
    });

    res.status(201).json({
      status: 'success',
      message: 'Language created successfully',
      data: language
    });
  } catch (error) {
    console.error('Error creating language:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create language'
    });
  }
};

// Get all languages
exports.getAllLanguages = async function(req, res) {
  try {
    const languages = await LANGUAGE.find().lean();
    
    // Add detail IDs to response
    const enhancedLanguages = await Promise.all(languages.map(async lang => {
      const detail = await LanguageDetail.findOne({ languageId: lang._id });
      return {
        ...lang,
        detailId: detail?._id || null // Handle case where no detail exists
      };
    }));

    res.status(200).json({
      status: 'success',
      message: 'All languages fetched successfully',
      data: enhancedLanguages
    });
  } catch (error) {
    console.error('Error fetching languages:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch languages'
    });
  }
}

// Get single language
exports.getLanguage = async (req, res) => {
  try {
    const language = await LANGUAGE.findById(req.params.id);
    
    if (!language) {
      return res.status(404).json({
        status: 'error',
        message: 'Language not found'
      });
    }

    // Get associated details
    const detail = await LanguageDetail.findOne({ languageId: language._id });

    res.status(200).json({
      status: 'success',
      data: {
        ...language.toObject(),
        detail: detail || null // Handle case where no detail exists
      }
    });
  } catch (error) {
    console.error('Error fetching language:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch language'
    });
  }
};

// Update language
exports.update = async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // If new file is uploaded, update image path
    if (req.file) {
      updateData.image = req.file.path;
    }

    const language = await LANGUAGE.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!language) {
      return res.status(404).json({
        status: 'error',
        message: 'Language not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Language updated successfully',
      data: language
    });
  } catch (error) {
    console.error('Error updating language:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update language'
    });
  }
};

// Delete language
exports.delete = async (req, res) => {
  try {
    const language = await LANGUAGE.findById(req.params.id);
    
    if (!language) {
      return res.status(404).json({
        status: 'error',
        message: 'Language not found'
      });
    }

    // Delete associated detail first
    await LanguageDetail.deleteOne({ languageId: language._id });

    // Then delete the language
    await language.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Language and associated details deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting language:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete language'
    });
  }
};