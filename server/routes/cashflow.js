const express = require("express");
const router = express.Router();
const Total = require("../models/Total");

router.get("/cashflow-summary/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const totals = await Total.find({ userId });

    const monthlyCashflow = {};

    totals.forEach((doc) => {
      const {
        year,
        month,
        incomeSpent = 0,
        billsSpent = 0,
        savingsSpent = 0,
        expenseSpent = 0,
      } = doc;
      const key = `${year}-${String(month).padStart(2, "0")}`;

      const expenses = billsSpent + savingsSpent + expenseSpent;
      const cashflow = incomeSpent - expenses;

      monthlyCashflow[key] = (monthlyCashflow[key] || 0) + cashflow;
    });

    const chartData = Object.entries(monthlyCashflow)
      .map(([month, cashflow]) => ({ month, cashflow }))
      .sort((a, b) => a.month.localeCompare(b.month));

    res.json(chartData);
  } catch (err) {
    console.error("Error fetching cashflow summary:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
