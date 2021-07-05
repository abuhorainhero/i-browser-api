const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const addSiteRevenueSchema = new Schema(
    {
        siteId: {
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

module.exports = mongoose.model("addSiteRevenue", addSiteRevenueSchema);
