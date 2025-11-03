const express = require('express');
const router = express.Router();
const Fuel = require('../models/Fuel');
const auth = require('../middleware/auth');

// GET all fuels (public)
router.get('/', async (req, res) => {
  const fuels = await Fuel.find();
  res.json(fuels);
});

// POST to create sample fuels (for dev) — in real app protected or admin-only
router.post('/seed', async (req, res) => {
  await Fuel.deleteMany({});
  const list = [
    { name: 'Petrol', pricePerLiter: 110, stockLiters: 10000 },
    { name: 'Diesel', pricePerLiter: 95, stockLiters: 12000 }
  ];
  const created = await Fuel.insertMany(list);
  res.json(created);
});

module.exports = router;
