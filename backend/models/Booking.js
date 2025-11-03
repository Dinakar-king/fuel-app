const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fuel: { type: mongoose.Schema.Types.ObjectId, ref: 'Fuel', required: true },
  liters: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  address: { type: String, required: true },
  status: { type: String, enum: ['pending','dispatched','delivered','cancelled'], default: 'pending' },
  etaMinutes: { type: Number, default: 60 },

  // --- ADD THESE ---
  isPaid: { type: Boolean, default: false },
  paymentId: { type: String } // To store the Stripe Payment Intent ID
  // --- END ADD ---

}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);