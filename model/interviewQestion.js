let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let interviewSchema = new Schema({
    question: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
      answer: {
        type: String,
        required: true,
        trim: true,
      },
      difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
        required: true,
      },
      category: {
        type: String,
        required: true,
        trim: true,
      },
    }, { timestamps: true });   
let INTERVIEW = mongoose.model("INTERVIEW", interviewSchema);
module.exports = INTERVIEW;
