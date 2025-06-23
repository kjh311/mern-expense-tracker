// routes/exportRoutes.js
const express = require("express");
const router = express.Router();
const Subcategory = require("../models/Subcategory");
const Transaction = require("../models/Transaction");
// We will manually build the CSV string, so json2csv might not be the primary tool
// const json2csv = require('json22csv').parse; // Optional: can still use for individual sections if preferred
const verifyToken = require("../middleware/verifyToken");

router.get("/monthly-data", verifyToken, async (req, res) => {
  try {
    const { month, year } = req.query;
    if (!month || !year) {
      return res.status(400).json({ message: "Month and year are required." });
    }

    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, parseInt(month) + 1, 0);

    const allUserSubcategories = await Subcategory.find({
      user: req.userId,
      categoryType: { $in: ["expense", "income", "bills", "savings"] },
    }).lean();

    const subcategoryMap = allUserSubcategories.reduce((acc, sub) => {
      acc[sub._id.toString()] = sub;
      return acc;
    }, {});

    const transactions = await Transaction.find({
      user: req.userId,
      date: { $gte: startOfMonth, $lte: endOfMonth },
      subcategory: { $in: allUserSubcategories.map((sub) => sub._id) },
    }).lean();

    // Group transactions by subcategory type AND then by subcategory name
    const groupedTransactions = {};
    allUserSubcategories.forEach((sub) => {
      if (!groupedTransactions[sub.categoryType]) {
        groupedTransactions[sub.categoryType] = {};
      }
      groupedTransactions[sub.categoryType][sub.name] = {
        id: sub._id.toString(),
        transactions: [],
        total: 0,
      };
    });

    transactions.forEach((txn) => {
      const subcategory = subcategoryMap[txn.subcategory.toString()];
      if (subcategory) {
        groupedTransactions[subcategory.categoryType][
          subcategory.name
        ].transactions.push(txn);
        groupedTransactions[subcategory.categoryType][subcategory.name].total +=
          txn.amount;
      }
    });

    // Define CSV header fields
    const csvFields = [
      "Type",
      "Category",
      "Source",
      "Amount",
      "Date",
      "Description",
    ];
    const csvHeader = csvFields.join(",");

    let csvContent = `Monthly Financial Summary for ${new Date(
      year,
      month
    ).toLocaleString("default", { month: "long", year: "numeric" })}\n\n`;

    let grandTotalIncome = 0;
    let grandTotalExpenses = 0;
    let grandTotalBills = 0;
    let grandTotalSavings = 0;

    // Order of categories for display
    const categoryOrder = ["income", "expense", "bills", "savings"];

    categoryOrder.forEach((categoryType) => {
      const displayCategoryName =
        categoryType.charAt(0).toUpperCase() + categoryType.slice(1);
      const subcategoriesOfType = groupedTransactions[categoryType];

      // Only add section if there are subcategories of this type
      if (Object.keys(subcategoriesOfType).length > 0) {
        csvContent += `"${displayCategoryName} Categories"\n\n`; // Section header
        csvContent += csvHeader + "\n"; // Table header

        let categoryTypeTotal = 0;

        // Sort subcategories by name for consistent output
        const sortedSubcategories = Object.keys(subcategoriesOfType).sort();

        sortedSubcategories.forEach((subName) => {
          const subData = subcategoriesOfType[subName];
          csvContent += `"${displayCategoryName}: ${subName}"\n`; // Subcategory heading within section

          subData.transactions.forEach((txn) => {
            const row = [
              `"${displayCategoryName}"`, // Type
              `"${subName}"`, // Category (Subcategory Name)
              `"${txn.description ? txn.description.replace(/"/g, '""') : ""}"`, // Source (escaped description)
              txn.amount,
              `"${txn.date.toISOString().split("T")[0]}"`, // Date
              `"${txn.description ? txn.description.replace(/"/g, '""') : ""}"`, // Description (escaped)
            ];
            csvContent += row.join(",") + "\n";
          });

          // Subcategory Total
          csvContent += `"", "Total for ${subName}", "", "${subData.total.toFixed(
            2
          )}", "", ""\n\n`; // Blank fields for other columns
          categoryTypeTotal += subData.total;
        });

        // Total for the entire category type (e.g., Total Income, Total Expenses)
        csvContent += `"", "TOTAL ${displayCategoryName.toUpperCase()}", "", "${categoryTypeTotal.toFixed(
          2
        )}", "", ""\n\n\n`;

        // Add to grand totals
        if (categoryType === "income") grandTotalIncome += categoryTypeTotal;
        else if (categoryType === "expense")
          grandTotalExpenses += categoryTypeTotal;
        else if (categoryType === "bills") grandTotalBills += categoryTypeTotal;
        else if (categoryType === "savings")
          grandTotalSavings += categoryTypeTotal;
      }
    });

    // Grand Summary (optional)
    csvContent += `"GRAND SUMMARY"\n`;
    csvContent += `"Total Income", "${grandTotalIncome.toFixed(2)}"\n`;
    csvContent += `"Total Expenses", "${grandTotalExpenses.toFixed(2)}"\n`;
    csvContent += `"Total Bills", "${grandTotalBills.toFixed(2)}"\n`;
    csvContent += `"Total Savings", "${grandTotalSavings.toFixed(2)}"\n`;
    csvContent += `"Net Balance (Income - Expenses - Bills)", "${(
      grandTotalIncome -
      grandTotalExpenses -
      grandTotalBills
    ).toFixed(2)}"\n`;
    csvContent += `"Net Balance (Income - Total Outflow)", "${(
      grandTotalIncome -
      grandTotalExpenses -
      grandTotalBills -
      grandTotalSavings
    ).toFixed(2)}"\n`;

    res.header("Content-Type", "text/csv");
    res.attachment(
      `monthly_financial_summary_${year}-${parseInt(month) + 1}.csv`
    );
    res.send(csvContent); // Send the manually constructed CSV string
  } catch (error) {
    console.error("Error exporting data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
