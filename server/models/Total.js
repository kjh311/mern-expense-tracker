const mongoose = require("mongoose");

const totalSchema = new mongoose.Schema({
  userId: String,
  month: Number,
  year: Number,
  incomeSpent: Number,
  billsSpent: Number,
  savingsSpent: Number,
  expenseSpent: Number,
});

module.exports = mongoose.model("Total", totalSchema);
