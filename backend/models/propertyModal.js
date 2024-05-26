const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
    {
        seller: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 255,
        },
        price: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
            maxlength: 255,
        },
        bedrooms: {
            type: Number,
            required: true,
            min: 0,
        },
        bathrooms: {
            type: Number,
            required: true,
            min: 0,
        },
        landmark: {
            type: String,
            maxlength: 255,
        },

        hospitalsNearby: {
            type: String,
            maxlength: 500,
        },

        schoolsNearby: {
            type: String,
            maxlength: 500,
        },
    },
    {
        timestamps: true, // This will automatically add createdAt and updatedAt fields
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
    }
);

propertySchema.virtual("likes", {
    ref: "Like",
    foreignField: "property",
    localField: "_id",
});

propertySchema.pre("remove", function (next) {
    // Remove all the assignment docs that reference the removed person.
    this.model("likes").remove({ property: this._id }, next);
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
