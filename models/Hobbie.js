const mongoose = require('mongoose');

const hobbiesSchema = new mongoose.Schema({
  hobbiesName: { type: String, required: true },
  hobbiesLink: { type: String },
  hobbiesPicture: { type: String },
} , { timestamps: true });

module.exports = mongoose.model('hobbies', hobbiesSchema);
