const mongoose = require("mongoose");

// Define the Like schema
const likeSchema = new mongoose.Schema(
    {
        likedBy: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        property: {
            type: mongoose.Schema.ObjectId,
            ref: "Property",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

likeSchema.index({ likedBy: 1, property: 1 }, { unique: true });

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
