const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  languageName: { type: String, required: true, unique: true },
  languageLevel: { type: String, required: true },
  languagePicture: {type: String },
}, { timestamps: true });

module.exports = mongoose.model('Language', languageSchema);