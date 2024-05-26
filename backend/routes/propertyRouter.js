const router = require("express").Router();
const propertyController = require("./../controllers/propertyController");
const userController = require("./../controllers/userController");

router.post(
    "/create",
    userController.protect,
    propertyController.createProperty
);

router.get("/", userController.protect, propertyController.getMyProperties);
router.get("/all", propertyController.getAllProperties);
router.get(
    "/:propertyId",
    userController.protect,
    propertyController.getProperty
);

router.patch(
    "/:propertyId/update",
    userController.protect,
    propertyController.updateProperty
);

router.delete(
    "/:propertyId/delete",
    userController.protect,
    propertyController.deleteProperty
);

module.exports = router;
