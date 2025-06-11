const LANGUAGE = require('../model/language');
const LanguageDetail = require('../model/langdetail');

// Create language
exports.create = async (req, res) => {
  try {
    // Handle image path
    let imagePath = '';
    if (req.file) {
      imagePath = req.file.path;
    } else if (req.body.image) {
      imagePath = req.body.image;
    } else {
      return res.status(400).json({
        status: "error",
        message: "Image is required"
      });
    }

    // Create the language
    const language = await LANGUAGE.create({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      image: imagePath
    });

    res.status(201).json({
      status: "success",
      message: "Language created successfully!",
      data: language
    });

  } catch (error) {
    console.error('Error creating language:', error);
    res.status(500).json({
      status: "error",
      message: error.message || "Failed to create language"
    });
  }
};

// Get all languages
exports.getAllLanguages = async function(req, res) {
  try {
    console.log('Fetching all languages...');
    
    // Get all languages with populated language details
    const languages = await LANGUAGE.find()
      .lean()
      .exec();
    
    console.log('Found languages:', languages.length);

    // Add detail IDs and process image URLs
    const enhancedLanguages = await Promise.all(languages.map(async lang => {
      const detail = await LanguageDetail.findOne({ languageId: lang._id });
      
      // Process image URL
      let imageUrl = lang.image;
      if (imageUrl && !imageUrl.startsWith('http')) {
        imageUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/${imageUrl}`;
      }

      return {
        ...lang,
        image: imageUrl,
        detailId: detail?._id
      };
    }));

    console.log('Enhanced languages:', enhancedLanguages.length);

    res.status(200).json({
      status: 'success',
      message: 'Languages fetched successfully',
      count: enhancedLanguages.length,
      data: enhancedLanguages
    });
  } catch (error) {
    console.error('Error fetching languages:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to fetch languages'
    });
  }
};

// Get single language
exports.getLanguage = async function(req, res) {
  try {
    console.log('Fetching language with ID:', req.params.id);
    
    const language = await LANGUAGE.findById(req.params.id);
    
    if (!language) {
      return res.status(404).json({
        status: 'error',
        message: 'Language not found'
      });
    }

    // Process image URL
    let imageUrl = language.image;
    if (imageUrl && !imageUrl.startsWith('http')) {
      imageUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/${imageUrl}`;
    }
    language.image = imageUrl;

    // Get associated detail
    const detail = await LanguageDetail.findOne({ languageId: language._id });
    
    res.status(200).json({
      status: 'success',
      message: 'Language found successfully',
      data: {
        ...language.toObject(),
        detail: detail
      }
    });
    
  } catch (error) {
    console.error('Error fetching language:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to fetch language'
    });
  }
};

// Update language
exports.update = async function(req, res) {
  try {
    console.log('Updating language with ID:', req.params.id);

    // Handle image update
    if (req.file) {
      req.body.image = req.file.path;
    }

    const language = await LANGUAGE.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!language) {
      return res.status(404).json({
        status: 'error',
        message: 'Language not found'
      });
    }

    // Process image URL
    let imageUrl = language.image;
    if (imageUrl && !imageUrl.startsWith('http')) {
      imageUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/${imageUrl}`;
    }
    language.image = imageUrl;

    res.status(200).json({
      status: 'success',
      message: 'Language updated successfully',
      data: language
    });
  } catch (error) {
    console.error('Error updating language:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to update language'
    });
  }
};

// Delete language
exports.delete = async function(req, res) {
  try {
    console.log('Deleting language with ID:', req.params.id);
    
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
      message: error.message || 'Failed to delete language'
    });
  }
};