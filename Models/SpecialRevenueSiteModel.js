const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const specialRevenueSiteSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
        },
        icon: {
            type: String,
            trim: true,
        },
        url: {
            type: String,
            trim: true,
        },
        minVisitingTime: {    // minutes
            type: Number,
            trim: true,
        },
        revenue: {
            type: Number,
            trim: true,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("specialRevenueSite", specialRevenueSiteSchema);
