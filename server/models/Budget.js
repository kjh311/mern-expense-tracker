const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: {
    type: String,
    enum: ["expense", "savings", "bills", "income"],
    required: true,
  },
  amount: { type: Number, required: true },
});

module.exports = mongoose.model("Budget", budgetSchema);
