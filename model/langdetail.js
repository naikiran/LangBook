const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const languageDetailSchema = new Schema({
  languageId: {
  type: Schema.Types.ObjectId,
  ref: "Language",
  required: true,
  index: true
},
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  syntax: { type: String, required: true },
  codeSnippets: [{
      title: String,
      code: String,
      explanation: String
  }],
  interviewQuestions: [{
      question: String,
      answer: String
  }],
  vivaQuestions: [{
      question: String,
      answer: String
  }],
  applications: [String],
  frameworks: [String],
  officialDocs: { type: String },
  history: {
      createdBy: String,
      firstAppeared: String,
      influencedBy: [String],
      influenced: [String]
  },
  paradigms: [String],
  typingDiscipline: String,
  fileExtensions: [String],
  latestVersion: String,
  communityLinks: [{
      name: String,
      url: String
  }],
  createdAt: { type: Date, default: Date.now }
});



const LanguageDetail = mongoose.model("LanguageDetail", languageDetailSchema);
module.exports = LanguageDetail;

















