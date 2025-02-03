const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const emailVerifyController = require("../../controllers/emailVerifyController");
const loginController = require("../../controllers/loginController");
const forgetController = require("../../controllers/forgotPassController");
const resendOTPController = require("../../controllers/resendOTPController");
const getUser = require("../../controllers/profileUser/getUser");
const updateProfilePicController = require("../../controllers/profileUser/updateProfilePicController");

router.post("/", userController);
router.post("/verify", emailVerifyController);
router.post("/login", loginController);
router.post("/forgot", forgetController);
router.put("/resend", resendOTPController);
router.get("/getuser/:userName", getUser);
router.put("/updateprofile", updateProfilePicController);

module.exports = router;
