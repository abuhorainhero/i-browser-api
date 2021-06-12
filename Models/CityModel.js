const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const citySchema = new Schema(
  {
    name: {
      type: String,
      trim: true
    },
    countryId: {
        type: String,
        trim: true
    },
    userCount: {
      type: Number,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("city", citySchema);
