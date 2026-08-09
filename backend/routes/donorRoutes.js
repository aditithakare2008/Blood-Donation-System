const express = require("express");
const bcrypt = require("bcryptjs");
const Donor = require("../models/Donor");

const router = express.Router();

// ===============================
// Register Donor
// ===============================
router.post("/", async (req, res) => {
  try {
    console.log("Donor registration received");

    const {
      name,
      email,
      password,
      phone,
      city,
      bloodType,
      age,
      weight,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !city ||
      !bloodType ||
      !age ||
      !weight
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const existingDonor = await Donor.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingDonor) {
      return res.status(400).json({
        success: false,
        message: "A donor with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const donor = new Donor({
      name,
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      phone,
      city,
      bloodType,
      age: Number(age),
      weight: Number(weight),
      isAvailable: true,
    });

    await donor.save();

    console.log("Donor saved successfully:", donor._id);

    const donorResponse = donor.toObject();
    delete donorResponse.password;

    res.status(201).json({
      success: true,
      message: "Donor registered successfully",
      donor: donorResponse,
    });

  } catch (error) {
    console.error("DONOR REGISTRATION ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to register donor",
      error: error.message,
    });
  }
});

// ===============================
// Search Available Donors
// ===============================
router.get("/", async (req, res) => {
  try {
    const { bloodType, city } = req.query;

    const filter = {
      isAvailable: true,
    };

    if (bloodType) {
      filter.bloodType = bloodType;
    }

    if (city) {
      filter.city = {
        $regex: city,
        $options: "i",
      };
    }

    console.log("SEARCH FILTER:", filter);

    const donors = await Donor.find(filter)
      .select("-password");

    console.log("AVAILABLE DONORS:", donors);

    res.json(donors);

  } catch (error) {
    console.error("DONOR SEARCH ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch donors",
      error: error.message,
    });
  }
});

// ===============================
// Update Donor Availability
// ===============================
router.put("/:id/availability", async (req, res) => {
  try {
    console.log("================================");
    console.log("AVAILABILITY UPDATE REQUEST");
    console.log("Donor ID:", req.params.id);
    console.log("New availability:", req.body.isAvailable);
    console.log("================================");

    const { isAvailable } = req.body;

    if (typeof isAvailable !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isAvailable must be true or false",
      });
    }

    const donor = await Donor.findByIdAndUpdate(
      req.params.id,
      {
        isAvailable: isAvailable,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!donor) {
      console.log("DONOR NOT FOUND:", req.params.id);

      return res.status(404).json({
        success: false,
        message: "Donor not found",
      });
    }

    console.log("UPDATED DONOR:");
    console.log({
      id: donor._id,
      name: donor.name,
      isAvailable: donor.isAvailable,
    });

    res.json({
      success: true,
      message: isAvailable
        ? "You are now available for donation 🟢"
        : "You are now unavailable for donation 🔴",
      donor,
    });

  } catch (error) {
    console.error("AVAILABILITY UPDATE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update availability",
      error: error.message,
    });
  }
});

module.exports = router;