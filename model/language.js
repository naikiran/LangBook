const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const languageSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Language name is required'],
    trim: true,
    unique: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
    default: 'https://via.placeholder.com/150'
  },
  languageDetail: {
    type: Schema.Types.ObjectId,
    ref: 'LanguageDetail',
    required: false
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Language', languageSchema);