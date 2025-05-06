const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
app.use(
  cors({
    origin: "https://mern-expense-tracker-t3dj.onrender.com", // or '*', but not recommended for production
    credentials: true,
  })
);
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const expensesRoutes = require("./routes/expenses"); // adjust path if needed
const subcategoriesRoute = require("./routes/subcategories");
const transactionRoutes = require("./routes/transactions");
const budgetRoutes = require("./routes/budget");
// const cashflowRoute = require("./routes/cashflow");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expensesRoutes);
app.use("/api/subcategories", subcategoriesRoute);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budget", budgetRoutes);
// app.use("/api/cashflow", cashflowRoute);

// connect to mongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`✅ Connected to DB: ${mongoose.connection.name}`))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("API is running!!!");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
