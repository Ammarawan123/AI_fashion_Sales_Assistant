
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
    },
    instagramId: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    orderHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    preferences: {
      favoriteColor: { type: String },
      favoriteCategory: { type: String },
      budgetRange: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
