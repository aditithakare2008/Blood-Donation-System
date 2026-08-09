const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    bloodType: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    },

    units: {
      type: Number,
      required: true,
      min: 0
    },

    location: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Inventory", inventorySchema);