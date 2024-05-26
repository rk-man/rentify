const router = require("express").Router();

const userController = require("./../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/me", userController.protect, userController.getMe);

module.exports = router;
