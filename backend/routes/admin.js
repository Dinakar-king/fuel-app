import express from "express";
import { body, validationResult } from "express-validator";
import Fuel from "../models/Fuel.js";

const router = express.Router();

// ✅ Middleware for validation
const validateFuel = [
  body("fuelType").isString().notEmpty().withMessage("Fuel type is required"),
  body("pricePerLiter")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0"),
  body("stock").isInt({ gt: 0 }).withMessage("Stock must be a positive integer"),
];

// ✅ POST: Add new fuel
router.post("/add", validateFuel, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { fuelType, pricePerLiter, stock } = req.body;
    const fuel = new Fuel({ fuelType, pricePerLiter, stock });
    await fuel.save();
    res.status(201).json({ message: "Fuel added successfully", fuel });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ PUT: Update fuel
router.put("/update/:id", validateFuel, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedFuel = await Fuel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "Fuel updated", updatedFuel });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const fuels = await Fuel.find();
    res.json(fuels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
