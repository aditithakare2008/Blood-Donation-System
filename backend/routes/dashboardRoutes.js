const express = require("express");

const Request = require("../models/Request");
const Inventory = require("../models/Inventory");
const Donation = require("../models/Donation");
const Donor = require("../models/Donor");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// Dashboard Statistics
// ==========================================
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    // Donor statistics
    const totalDonors = await Donor.countDocuments();

    const availableDonors = await Donor.countDocuments({
      isAvailable: true,
    });

    // Request statistics
    const totalRequests = await Request.countDocuments();

    const pendingRequests = await Request.countDocuments({
      status: "Pending",
    });

    const completedRequests = await Request.countDocuments({
      status: "Completed",
    });

    // Donation statistics
    const totalDonations = await Donation.countDocuments();

    // Inventory statistics
    const inventory = await Inventory.find();

    const totalBloodUnits = inventory.reduce(
      (total, item) => total + Number(item.units || 0),
      0
    );

    res.json({
      success: true,

      stats: {
        totalDonors,
        availableDonors,
        totalRequests,
        pendingRequests,
        completedRequests,
        totalDonations,
        totalBloodUnits,
      },

      lastUpdated: new Date(),
    });
  } catch (error) {
    console.error("DASHBOARD ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
      error: error.message,
    });
  }
});

module.exports = router;