const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const newsSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
        },
        image: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        collectFrom: {
            type: String,
            trim: true,
        },
        topic: {
            type: String,
            trim: true,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);




module.exports = mongoose.model("news", newsSchema);
