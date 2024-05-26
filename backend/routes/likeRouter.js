const router = require("express").Router();
const likeController = require("../controllers/likeController");
const userController = require("../controllers/userController");

router.post("/:propertyId/add", userController.protect, likeController.addLike);
router.delete(
    "/:propertyId/remove",
    userController.protect,
    likeController.removeLike
);

module.exports = router;
