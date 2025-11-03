const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Booking = require("../models/Booking");
const Fuel = require("../models/Fuel");
const { sendSMS } = require("../utils/sendSMS");

// ✅ Create booking (MODIFIED FOR PRE-PAYMENT)
router.post("/", auth, async (req, res) => {
  // Get new fields from the request body
  const { fuelId, liters, address, isPaid, paymentId } = req.body;
  const userId = req.user.id;

  try {
    const fuel = await Fuel.findById(fuelId);
    if (!fuel) {
      return res.status(400).json({ msg: "Fuel not found" });
    }
    if (fuel.stockLiters < liters) {
      return res.status(400).json({ msg: "Not enough stock available" });
    }

    const totalPrice = liters * fuel.pricePerLiter;

    // ✅ Reduce stock
    fuel.stockLiters -= liters;
    await fuel.save();

    // ✅ Create booking with new payment fields
    const booking = new Booking({
      user: userId,
      fuel: fuel._id,
      liters,
      totalPrice,
      address,
      status: "dispatched", // You might want to change this logic
      etaMinutes: 60,
      
      // ✅ Save payment status
      isPaid: isPaid || false,
      paymentId: paymentId || null 
    });

    await booking.save();

    // ✅ Send SMS notification (after booking success)
    try {
      // NOTE: You must buy a phone number to send SMS. 
      // This +91 number is just a placeholder.
      await sendSMS(
        "+919876543210", // This should ideally be the user's phone number
        `Your fuel order has been confirmed and will be delivered within an hour. 🚚⛽`
      );
    } catch (smsErr) {
      console.error("SMS failed:", smsErr.message);
      // Do not block the request if SMS fails
    }

    res.json(booking);
  } catch (err) {
    console.error("Booking error:", err.message);
    res.status(500).send("Server error");
  }
});

// ✅ Get bookings for the logged-in user (Unchanged)
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await Booking.find({ user: userId }).populate("fuel");
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
