let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let vivaSchema = new Schema({
  languageId: {
    type: String,
  },
  question: {
    type: String,
    required: [true, "question is required"],
    trim: true,
  },
  answer: {
    type: String,
    required: [true, "answer  is required"],
    trim: true,
  }
});
let VIVA = mongoose.model("VIVA", vivaSchema);
module.exports = VIVA;
