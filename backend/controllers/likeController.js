const User = require("./../models/userModal");
const Property = require("./../models/propertyModal");
const Like = require("./../models/likeModal");

const catchAsync = require("express-async-handler");
const appError = require("./../utils/appError");

exports.addLike = catchAsync(async (req, res, next) => {
    const like = await Like.create({
        likedBy: req.currentUser._id,
        property: req.params.propertyId,
    });

    if (!like) {
        return next(new appError(401, "Couldn't create new like...."));
    }

    console.log("like Created : ", like);

    return res.status(201).json({
        status: "success",
        data: { like },
    });
});

exports.removeLike = catchAsync(async (req, res, next) => {
    const like = await Like.findOneAndDelete({
        likedBy: req.currentUser._id,
        property: req.params.propertyId,
    });

    return res.status(204).json({
        status: "success",
    });
});
