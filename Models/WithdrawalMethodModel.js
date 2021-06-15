const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const withdrawalMethodSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);




module.exports = mongoose.model("withdrawalMethod", withdrawalMethodSchema);
