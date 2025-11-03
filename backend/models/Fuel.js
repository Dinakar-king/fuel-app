const mongoose = require('mongoose');

const fuelSchema = new mongoose.Schema({
  name: { type: String, required: true }, // petrol / diesel
  pricePerLiter: { type: Number, required: true },
  stockLiters: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Fuel', fuelSchema);
