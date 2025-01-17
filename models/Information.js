const mongoose = require('mongoose');

const personnalSchema = new mongoose.Schema({
  peronnalName: { type: String, required: true },
  peronnalEmail: { type: String, required: true },
  peronnalPhone: { type: String, required: true },
  personnalBirthday: { type: Date, required: true },
  personnalAddress: { type: String, required: true },
  personnalPicture: { type: String, required: true },
} , { timestamps: true });

module.exports = mongoose.model('personnal', personnalSchema);