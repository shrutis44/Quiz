const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");

router.post("/register", playerController.register);
router.post("/verify-otp", playerController.verifyOtp);

module.exports = router;
