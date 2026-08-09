const express = require("express");
const Request = require("../models/Request");
const Inventory = require("../models/Inventory");

const router = express.Router();

// Create a new blood request
router.post("/", async (req, res) => {
  try {
    const newRequest = new Request(req.body);

    const savedRequest = await newRequest.save();

    res.status(201).json({
      success: true,
      message: "Blood request created successfully!",
      request: savedRequest,
    });
  } catch (error) {
    console.error("BLOOD REQUEST ERROR:", error);

    res.status(400).json({
      success: false,
      message: "Failed to create blood request",
      error: error.message,
    });
  }
});

// Get all blood requests
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      requests,
    });
  } catch (error) {
    console.error("GET REQUESTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch blood requests",
      error: error.message,
    });
  }
});

// Fulfill a blood request
router.put("/:id/fulfill", async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Blood request not found.",
      });
    }

    if (request.status === "Completed") {
      return res.status(400).json({
        success: false,
        message: "This blood request is already completed.",
      });
    }

    const inventory = await Inventory.findOne({
      bloodType: request.bloodType,
      location: request.location,
    });

    if (!inventory) {
      return res.status(404).json({
        success: false,
        message: "No matching blood inventory found.",
      });
    }

    if (inventory.units < request.unitsRequired) {
      return res.status(400).json({
        success: false,
        message: "Insufficient blood units available.",
      });
    }

    inventory.units -= request.unitsRequired;
    await inventory.save();

    request.status = "Completed";
    await request.save();

    res.json({
      success: true,
      message: "Blood request fulfilled successfully!",
      request,
      inventory,
    });
  } catch (error) {
    console.error("FULFILL REQUEST ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fulfill blood request",
      error: error.message,
    });
  }
});

module.exports = router;