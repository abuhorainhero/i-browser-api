const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const adminSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    role: {
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

    dashboard: {
        type: Boolean,
        trim: true,
    },
    users: {
        type: Boolean,
        trim: true,
    },
    ads: {
        type: Boolean,
        trim: true,
    },
    interest: {
        type: Boolean,
        trim: true,
    },
    withdrawal: {
        type: Boolean,
        trim: true,
    },
    news: {
        type: Boolean,
        trim: true,
    },
    country: {
        type: Boolean,
        trim: true,
    },
    city: {
        type: Boolean,
        trim: true,
    },
    browsingRevenue: {
        type: Boolean,
        trim: true,
    },
    

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("admin", adminSchema);
