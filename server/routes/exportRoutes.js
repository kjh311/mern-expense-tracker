// routes/exportRoutes.js
const express = require("express");
const router = express.Router();
// REMOVE THIS LINE: const Expense = require('../models/Expense'); // No longer needed
const Subcategory = require("../models/Subcategory");
const Transaction = require("../models/Transaction");
const json2csv = require("json2csv").parse;
const verifyToken = require("../middleware/verifyToken");

router.get("/monthly-data", verifyToken, async (req, res) => {
  try {
    const { month, year } = req.query; // Month is 0-indexed (0 for Jan, 11 for Dec)
    if (!month || !year) {
      return res.status(400).json({ message: "Month and year are required." });
    }

    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, parseInt(month) + 1, 0); // Last day of the month

    // --- Fetch all relevant subcategories for the user, for ALL types ---
    const allUserSubcategories = await Subcategory.find({
      user: req.userId,
      categoryType: { $in: ["expense", "income", "bills", "savings"] }, // Fetch all types
    }).lean();

    // Create a map to quickly look up subcategory details by their ID
    const subcategoryMap = allUserSubcategories.reduce((acc, sub) => {
      acc[sub._id.toString()] = sub;
      return acc;
    }, {});

    // --- Fetch ALL Transactions for the selected month ---
    const transactions = await Transaction.find({
      user: req.userId,
      date: { $gte: startOfMonth, $lte: endOfMonth },
      // Only include transactions whose subcategory is among the user's defined ones
      subcategory: { $in: allUserSubcategories.map((sub) => sub._id) },
    }).lean(); // No need to populate, we'll use the map

    // --- Combine and format data for CSV ---
    const combinedData = [];

    transactions.forEach((txn) => {
      const subcategory = subcategoryMap[txn.subcategory.toString()];

      if (subcategory) {
        // Ensure the subcategory exists (it should)
        combinedData.push({
          Type:
            subcategory.categoryType.charAt(0).toUpperCase() +
            subcategory.categoryType.slice(1), // e.g., "Expense", "Income", "Bills", "Savings"
          Category: subcategory.name, // The specific subcategory name (e.g., "Groceries", "Job Income", "Rent")
          Source: txn.description || "", // Using description as Source, or you can adjust
          Amount: txn.amount,
          Date: txn.date.toISOString().split("T")[0], //紝-MM-DD
          Description: txn.description || "", // Keep description as a separate column too, or combine with Source
        });
      }
    });

    // Define fields for CSV
    const fields = [
      "Type",
      "Category",
      "Source",
      "Amount",
      "Date",
      "Description",
    ]; // Order matters

    // Convert JSON to CSV
    const csv = json2csv(combinedData, { fields });

    res.header("Content-Type", "text/csv");
    res.attachment(
      `monthly_financial_summary_${year}-${parseInt(month) + 1}.csv`
    );
    res.send(csv);
  } catch (error) {
    console.error("Error exporting data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
