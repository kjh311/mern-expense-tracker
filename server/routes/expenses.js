const express = require("express");
const Expense = require("../models/Expense");
const verifyToken = require("../middleware/auth"); // Ensure this is imported correctly

const router = express.Router();

// POST route to create an expense
router.post("/", verifyToken, async (req, res) => {
  const { amount, description, subcategory } = req.body;

  if (!amount || !description || !subcategory) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const { amount, description, subcategory, date } = req.body;

    const expense = new Expense({
      user: req.userId, // ✅ correct field
      amount: parseFloat(amount), // ensure it's a number
      description,
      subcategory,
      date: date ? new Date(date) : Date.now(),
    });

    await expense.save();
    res.status(201).json({ message: "Expense created successfully", expense });
  } catch (error) {
    console.error("Error creating expense:", error); // Add this line
    res.status(500).json({ message: "Server error", error });
  }
});

// GET: All expenses for the current user
router.get("/", verifyToken, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.userId }).sort({
      date: -1,
    });

    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
