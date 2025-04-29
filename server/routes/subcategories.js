const express = require("express");
const router = express.Router();
const Subcategory = require("../models/Subcategory");
const verifyToken = require("../middleware/verifyToken");
const Transaction = require("../models/Transaction");

// POST NEW SUBCATEGORY

// * UserID or user?? *
router.post("/", verifyToken, async (req, res) => {
  const { categoryType, name, budget, month, year } = req.body;

  try {
    const newSubcategory = new Subcategory({
      user: req.userId,
      categoryType,
      name,
      budget,
      month,
      year,
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

//Get all EXPENSE sucategories with their transactions

router.get("/expense-with-transactions", verifyToken, async (req, res) => {
  try {
    const expenseSubs = await Subcategory.find({
      user: req.userId,
      categoryType: "expense",
    });

    const subsWithTransactions = await Promise.all(
      expenseSubs.map(async (sub) => {
        const transactions = await Transaction.find({
          user: req.userId,
          subcategory: sub._id,
        }).sort({ date: -1 });

        return {
          ...sub._doc,
          transactions,
        };
      })
    );

    res.json(subsWithTransactions);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

//Get all BILLS sucategories with their transactions

router.get("/bills-with-transactions", verifyToken, async (req, res) => {
  try {
    const expenseSubs = await Subcategory.find({
      user: req.userId,
      categoryType: "bills",
    });

    const subsWithTransactions = await Promise.all(
      expenseSubs.map(async (sub) => {
        const transactions = await Transaction.find({
          user: req.userId,
          subcategory: sub._id,
        }).sort({ date: -1 });

        return {
          ...sub._doc,
          transactions,
        };
      })
    );

    res.json(subsWithTransactions);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

//Get all INCOME sucategories with their transactions

router.get("/income-with-transactions", verifyToken, async (req, res) => {
  try {
    const expenseSubs = await Subcategory.find({
      user: req.userId,
      categoryType: "income",
    });

    const subsWithTransactions = await Promise.all(
      expenseSubs.map(async (sub) => {
        const transactions = await Transaction.find({
          user: req.userId,
          subcategory: sub._id,
        }).sort({ date: -1 });

        return {
          ...sub._doc,
          transactions,
        };
      })
    );

    res.json(subsWithTransactions);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

//Get all SAVINGS sucategories with their transactions

router.get("/savings-with-transactions", verifyToken, async (req, res) => {
  try {
    const expenseSubs = await Subcategory.find({
      user: req.userId,
      categoryType: "savings",
    });

    const subsWithTransactions = await Promise.all(
      expenseSubs.map(async (sub) => {
        const transactions = await Transaction.find({
          user: req.userId,
          subcategory: sub._id,
        }).sort({ date: -1 });

        return {
          ...sub._doc,
          transactions,
        };
      })
    );

    res.json(subsWithTransactions);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// DELETE SUBCATEGORY AND TRANSACTIONS
router.delete("/:id", verifyToken, async (req, res) => {
  const subCategoryId = req.params.id;

  try {
    await Subcategory.findByIdAndDelete(subCategoryId);

    await Transaction.deleteMany({ subcategory: subCategoryId });

    res
      .status(200)
      .json({ message: "Subcategory and its transactions deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE SUBCATEGORY
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updated = await Subcategory.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

module.exports = router;
