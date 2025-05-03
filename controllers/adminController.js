const Admin = require("../models/Admin");
const Quiz = require("../models/Quiz");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = new Admin({ username, password });
    await admin.save();
    res.status(201).json({ message: "Admin registered" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createQuiz = async (req, res) => {
  const { title, questions } = req.body;
  try {
    const quiz = new Quiz({ title, questions, createdBy: req.admin.id });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAdminQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ createdBy: req.admin.id });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
