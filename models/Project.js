const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectTitle: { type: String, required: true },
  projectDescription: { type: String, required: true },
  projectDate: { type: Date, required: true },
  projectLink: { type: String, required: true },
  projectLinkImage: { type: String, required: true },
} , { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);