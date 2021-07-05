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
      unique: true
    },
    email: {
      type: String,
      trim: true,
      unique: true
    },
    password: {
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
    totalMinuteServed: {  // specialRevenueSite othersite e barbe
      type: Number,
      trim: true,
    },
    totalAdsViewed: {    // total ads view count hbe
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
    firebaseToken: {
      type: String,
      trim: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("user", userSchema);
