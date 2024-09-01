const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const sessionMiddleware = require("../middlewares/sessionMiddleware");

router.post("/register", userController.register);
router.post("/forget-password", userController.forgetPassword)
router.get("/logout", sessionMiddleware, userController.logout);
router.get("/login", userController.login);
router.patch("/update-password", userController.updatePassword);
router.patch("/update-profile/:email", userController.updateProfile);

module.exports = router;
