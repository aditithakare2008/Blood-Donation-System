const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Donor = require("../models/Donor");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN REQUEST:", email);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const donor = await Donor.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!donor) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      donor.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: donor._id.toString(),
        email: donor.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const donorData = {
      id: donor._id.toString(),
      _id: donor._id.toString(),
      name: donor.name,
      email: donor.email,
      phone: donor.phone,
      city: donor.city,
      bloodType: donor.bloodType,
      age: donor.age,
      weight: donor.weight,
      isAvailable: donor.isAvailable,
    };

    console.log("LOGIN SUCCESS:", donorData);

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token: token,
      donor: donorData,
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
});

module.exports = router;