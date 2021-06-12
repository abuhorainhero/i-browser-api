const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
    },
    countryId: {
      type: String,
      trim: true,
    },
    cityId: {
      type: String,
      trim: true,
    },
    walletAmount: {
      type: Number,
      trim: true,
    },
    totalMinuteServed: {
      type: Number,
      trim: true,
    },
    totalAdsViewed: {
      type: Number,
      trim: true,
    },
    withdrawalMethodId: {
      type: String,
      trim: true,
    },
    accountNo: {
      type: String,
      trim: true,
    },
    interests: {
      type: Array,
      trim: true,
    },
    // --- Firebase Token ---
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("user", userSchema);
