const mongoose = require('mongoose');

const formationSchema = new mongoose.Schema({
  formationName: { type: String, required: true },
  formationStructure: { type: String },
  formationDescription: { type: String, required: true },
  formationStartDate: { type: Date, required: true },
  formationEndDate: { type: Date },
  formationLocation: { type: String },
  formationLink: { type: String },
  formationStructurePicture: { type: String },
} , { timestamps: true });

module.exports = mongoose.model('formation', formationSchema);
