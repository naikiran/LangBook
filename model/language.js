const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const languageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  languageDetail: {  // Make this optional
    type: Schema.Types.ObjectId,
    ref: 'LanguageDetail',
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Language', languageSchema);
