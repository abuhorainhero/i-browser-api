const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const viewedAdsSchema = new Schema(
    {
        adsId: {
            type: String,
            trim: true,
        },
        userId: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("viewedAds", viewedAdsSchema);
