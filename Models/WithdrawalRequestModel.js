const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const withdrawalRequestSchema = new Schema(
    {
        userId: {
            type: String,
            trim: true,
        },
        withdrawalMethodId: {
            type: String,
            trim: true,
        },
        accountNo: {
            type: String,
            trim: true,
        },
        amount: {
            type: Number,
            trim: true,
        },
        status: {
            type: String,
            trim: true,
        },
        note: {
            type: String,
            trim: true,
        }

    },
    {
        timestamps: true,
        versionKey: false,
    }
);




module.exports = mongoose.model("withdrawalRequest", withdrawalRequestSchema);
