const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://budget-tracker-mern.netlify.app",
      "https://mern-expense-tracker.fly.dev",
    ],
    credentials: true,
  })
);

// app.options("*", cors());
//delete

const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const expensesRoutes = require("./routes/expenses");
const subcategoriesRoute = require("./routes/subcategories");
const transactionRoutes = require("./routes/transactions");
const budgetRoutes = require("./routes/budget");

dotenv.config();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expensesRoutes);
app.use("/api/subcategories", subcategoriesRoute);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budget", budgetRoutes);

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

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server is running on port ${PORT}`)
);
