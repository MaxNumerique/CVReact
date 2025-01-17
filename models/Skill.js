const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  skillName: { type: String, required: true },
  skillDescription: { type: String, required: true },
  skillLink: { type: String },
  skillPicture: { type: String },
} , { timestamps: true });

module.exports = mongoose.model('skill', skillSchema);