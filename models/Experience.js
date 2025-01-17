const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  experienceName: { type: String, required: true },
  experienceCompany: { type: String, required: true },
  experienceDescription: { type: String, required: true },
  experienceStartDate: { type: Date, required: true },
  experienceEndDate: { type: Date },
  experienceLocation: { type: String },
  experienceLink: { type: String },
  experienceCompanyPicture: { type: String },
} , { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
