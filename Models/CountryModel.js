const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const countrySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true
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

module.exports = mongoose.model("country", countrySchema);
