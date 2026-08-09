const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    recipientName: {
      type: String,
      required: true
    },

    bloodType: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    },

    unitsRequired: {
      type: Number,
      required: true,
      min: 1
    },

    hospitalName: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    contactNumber: {
      type: String,
      required: true
    },

    urgency: {
      type: String,
      enum: ["Normal", "Urgent", "Emergency"],
      default: "Normal"
    },

    requiredDate: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Completed", "Cancelled"],
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Request", requestSchema);