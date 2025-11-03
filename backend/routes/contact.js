const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.json({ msg: 'Received' });
  } catch (err) {
    console.error(err); res.status(500).send('Server error');
  }
});

module.exports = router;
