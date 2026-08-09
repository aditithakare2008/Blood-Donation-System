const express = require("express");
const Donation = require("../models/Donation");
const Inventory = require("../models/Inventory");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Record a blood donation
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      donorName,
      bloodType,
      unitsDonated,
      location
    } = req.body;

    // Save donation record
    const donation = new Donation({
      donorName,
      bloodType,
      unitsDonated,
      location
    });

    const savedDonation = await donation.save();

    // Find existing inventory for the same blood type and location
    let inventory = await Inventory.findOne({
      bloodType,
      location
    });

    if (inventory) {
      // Add donated units to existing stock
      inventory.units += unitsDonated;
      await inventory.save();
    } else {
      // Create new inventory record
      inventory = new Inventory({
        bloodType,
        units: unitsDonated,
        location
      });

      await inventory.save();
    }

    res.status(201).json({
      success: true,
      message: "Blood donation recorded successfully! 🩸",
      donation: savedDonation,
      inventory
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Get all donations
router.get("/", authMiddleware, async (req, res) => {
  try {
    const donations = await Donation.find().sort({
      donationDate: -1
    });

    res.json({
      success: true,
      donations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;