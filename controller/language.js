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
      message: error.message
    });
  }
};

// Get all languages
exports.getAllLanguages = async (req, res) => {
  try {
    // First get all languages
    const languages = await LANGUAGE.find()
      .select('name category description image createdAt updatedAt')
      .lean();

    // Then get their details separately
    const enhancedLanguages = await Promise.all(languages.map(async (lang) => {
      try {
        const detail = await LanguageDetail.findOne({ languageId: lang._id })
          .select('_id')
          .lean();

        return {
          ...lang,
          hasDetails: !!detail,
          detailId: detail?._id
        };
      } catch (err) {
        console.error(`Error fetching details for language ${lang._id}:`, err);
        return {
          ...lang,
          hasDetails: false,
          detailId: null
        };
      }
    }));

    res.status(200).json({
      status: 'success',
      count: enhancedLanguages.length,
      data: enhancedLanguages
    });
  } catch (error) {
    console.error('Error fetching languages:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get single language
exports.getLanguage = async (req, res) => {
  try {
    const language = await LANGUAGE.findById(req.params.id)
      .select('name category description image createdAt updatedAt')
      .lean();
    
    if (!language) {
      return res.status(404).json({
        status: 'error',
        message: 'Language not found'
      });
    }

    // Get associated details
    const detail = await LanguageDetail.findOne({ languageId: language._id })
      .select('-__v')
      .lean();

    res.status(200).json({
      status: 'success',
      data: {
        ...language,
        detail: detail || null
      }
    });
  } catch (error) {
    console.error('Error fetching language:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update language
exports.update = async (req, res) => {
  try {
    const updateData = {
      ...(req.body.name && { name: req.body.name }),
      ...(req.body.category && { category: req.body.category }),
      ...(req.body.description && { description: req.body.description }),
      ...(req.file && { image: req.file.path }),
      ...(req.body.image && !req.file && { image: req.body.image })
    };

    const language = await LANGUAGE.findByIdAndUpdate(
      req.params.id,
      updateData,
      { 
        new: true, 
        runValidators: true,
        select: 'name category description image createdAt updatedAt'
      }
    ).lean();

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
      message: error.message
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
      message: error.message
    });
  }
};