const mongoose = require("mongoose");

// Define the Like schema
const interestSchema = new Schema(
    {
        interestedUser: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        property: {
            type: mongoose.Schema.ObjectId,
            ref: "Property",
            required: true,
        },
        emailSent: {
            type: Boolean,
            required: [true],
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// interestSchema.index({ interestedUser: 1, property: 1 }, { unique: true });

const Interest = mongoose.model("Interest", interestSchema);
module.exports = Interest;
