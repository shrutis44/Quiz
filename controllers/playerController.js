const Player = require("../models/Player");
const axios = require("axios");

exports.register = async (req, res) => {
  const { email, otp, recaptchaToken } = req.body;
  try {
    const verifyRes = await axios.post("https://www.google.com/recaptcha/api/siteverify", null, {
      params: {
        secret: process.env.RECAPTCHA_SECRET,
        response: recaptchaToken,
      },
    });

    if (!verifyRes.data.success) return res.status(400).json({ message: "reCAPTCHA failed" });

    const player = new Player({ email, otp });
    await player.save();
    res.status(201).json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const player = await Player.findOne({ email });
    if (!player || player.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

    player.verified = true;
    player.otp = null;
    await player.save();
    res.json({ message: "Player verified successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
