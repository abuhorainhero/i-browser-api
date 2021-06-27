const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const otherRevenueSiteSchema = new Schema(
    {
        minVisitingTime: {    // minutes
            type: Number,
            trim: true,
        },
        revenue : {
            type: Number,
            trim: true,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("otherRevenueSite", otherRevenueSiteSchema);
