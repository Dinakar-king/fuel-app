const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vehicleType: { type: String, enum: ['car','bike'], required: true },
  description: { type: String },
  address: { type: String, required: true },
  status: { type: String, enum: ['pending','on-the-way','completed','cancelled'], default: 'pending' },
  etaMinutes: { type: Number, default: 60 }
}, { timestamps: true });

module.exports = mongoose.model('ServiceBooking', serviceSchema);
