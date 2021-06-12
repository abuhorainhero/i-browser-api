const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const interestSchema = new Schema(
  {
    topic: {
      type: String,
      trim: true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("interest", interestSchema);
