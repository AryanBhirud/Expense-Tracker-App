const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require("./src/routes/auth");
const expensesRouter = require("./src/routes/expenses");
const Expense = require("./src/models/Expense");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/auth", authRouter);
app.use("/expenses", expensesRouter);

// Change Streams
const changeStream = Expense.watch();
changeStream.on("change", (change) => {
  console.log("Change detected:", change);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
