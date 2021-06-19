const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const adsSchema = new Schema(
    {
        url: {
            type: String,
            trim: true,
        },
        title: {
            type: String,
            trim: true,
        },
        instruction: {
            type: String,
            trim: true,
        },
        minVisitingTime: {      // seconds
            type: Number,
            trim: true,
        },
        revenue: {
            type: Number,
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("ads", adsSchema);
