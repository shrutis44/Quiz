const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const auth = require("../middleware/authMiddleware");

router.post("/register", adminController.register);
router.post("/login", adminController.login);
router.post("/quiz", auth, adminController.createQuiz);
router.get("/quizzes", auth, adminController.getAdminQuizzes);

module.exports = router;
