const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ServiceBooking = require('../models/ServiceBooking');

// create service booking
router.post('/', auth, async (req, res) => {
  try {
    const { vehicleType, description, address } = req.body;
    const booking = new ServiceBooking({
      user: req.user.id,
      vehicleType,
      description,
      address,
      status: 'on-the-way',
      etaMinutes: 60
    });
    await booking.save();
    res.json(booking);
  } catch (err) {
    console.error(err); res.status(500).send('Server error');
  }
});

// get user's service bookings
router.get('/', auth, async (req, res) => {
  const items = await ServiceBooking.find({ user: req.user.id });
  res.json(items);
});

module.exports = router;
