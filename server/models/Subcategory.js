const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    categoryType: {
      type: String,
      enum: ["expense", "bills", "savings", "income"],
      required: true,
    },
    name: { type: String, required: true },
    budget: { type: Number, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subcategory", subcategorySchema);
