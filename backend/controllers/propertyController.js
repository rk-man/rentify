const User = require("./../models/userModal");
const Property = require("./../models/propertyModal");
const catchAsync = require("express-async-handler");
const appError = require("./../utils/appError");

exports.createProperty = catchAsync(async (req, res, next) => {
    const property = await Property.create({
        seller: req.currentUser._id,
        ...req.body,
    });

    if (!property) {
        return next(new appError(401, "Couldn't create new property...."));
    }

    console.log("Property Created : ", property);

    return res.status(201).json({
        status: "success",
        data: { property },
    });
});

exports.getMyProperties = catchAsync(async (req, res, next) => {
    const properties = await Property.find({
        seller: req.currentUser._id,
    }).populate({
        path: "likes",
    });

    return res.status(200).json({
        status: "success",
        data: { properties },
    });
});

exports.getProperty = catchAsync(async (req, res, next) => {
    const property = await Property.findById(req.params.propertyId).populate(
        "likes"
    );

    return res.status(200).json({
        status: "success",
        data: { property },
    });
});

exports.updateProperty = catchAsync(async (req, res, next) => {
    const property = await Property.findByIdAndUpdate(
        req.params.propertyId,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    return res.status(200).json({
        status: "success",
        data: { property },
    });
});

exports.deleteProperty = catchAsync(async (req, res, next) => {
    const property = await Property.findByIdAndDelete(req.params.propertyId);

    return res.status(204).json({
        status: "success",
        data: { property },
    });
});

exports.getAllProperties = catchAsync(async (req, res, next) => {
    const properties = await Property.find().populate({
        path: "likes",
    });

    return res.status(200).json({
        status: "success",
        data: { properties },
    });
});
