const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  vehicleType: { type: String, enum: ['car','bike','none'], default: 'none' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
