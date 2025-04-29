let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let categorySchema = new Schema({
  category: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  }
});
module.exports = mongoose.model("category", categorySchema);
exports.categorySchema = categorySchema;
