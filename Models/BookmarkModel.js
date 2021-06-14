const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const bookmarkSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
        },
        userId: {
            type: String,
            trim: true,
        },
        siteUrl: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);




module.exports = mongoose.model("bookmark", bookmarkSchema);
