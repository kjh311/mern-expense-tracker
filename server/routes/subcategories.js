const express = require("express");
const router = express.Router();
const Subcategory = require("../models/Subcategory");
const verifyToken = require("../middleware/verifyToken");

// POST NEW SUBCATEGORY

// * UserID or user?? *
router.post("/", verifyToken, async (req, res) => {
  const { categoryType, name } = req.body;

  try {
    const newSubcategory = new Subcategory({
      user: req.userId,
      categoryType,
      name,
    });

    const saved = await newSubcategory.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

// GET ALL SUBCATEGORIES

// * UserID or user?? *
router.get("/", verifyToken, async (req, res) => {
  try {
    const subs = await Subcategory.find({ user: req.userId });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
