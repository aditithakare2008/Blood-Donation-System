const express = require("express");
const Inventory = require("../models/Inventory");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add blood inventory
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { bloodType, units, location } = req.body;

    const inventory = new Inventory({
      bloodType,
      units,
      location
    });

    const savedInventory = await inventory.save();

    res.status(201).json({
      success: true,
      message: "Blood inventory added successfully!",
      inventory: savedInventory
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Get all blood inventory
router.get("/", authMiddleware, async (req, res) => {
  try {
    const inventory = await Inventory.find().sort({
      bloodType: 1
    });

    res.json({
      success: true,
      inventory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update blood inventory
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { units } = req.body;

    const inventory = await Inventory.findByIdAndUpdate(
      req.params.id,
      { units },
      { new: true, runValidators: true }
    );

    if (!inventory) {
      return res.status(404).json({
        success: false,
        message: "Inventory not found."
      });
    }

    res.json({
      success: true,
      message: "Blood inventory updated successfully!",
      inventory
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;