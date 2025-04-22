const express = require("express");
const router = express.Router();
const Budget = require("../models/Budget");
const verifyToken = require("../middleware/verifyToken");

//POST BUDGET
router.post("/", verifyToken, async (req, res) => {
  const { category, amount } = req.body;
  try {
    const existing = await Budget.findOne({ user: req.userId, category });
    if (existing) {
      existing.amount = amount;
      await existing.save();
      return res.json(existing);
    }
    const newBudget = new Budget({ user: req.userId, category, amount });
    await newBudget.save();
    res.json(newBudget);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

// GET ALL BUDGETS
router.get("/", verifyToken, async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.userId });
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
