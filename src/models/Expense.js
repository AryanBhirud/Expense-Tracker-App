const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true // Index for userID
  },
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0 // Validation rule for amount
  },
  description: {
    type: String,
    required: true, // Validation rule for description
    minlength: 1, // Ensure description is not empty
    text: true // Enable text search
  },
  date: {
    type: Date,
    default: Date.now,
    index: true // Index for date
  }
});

module.exports = mongoose.model("Expense", ExpenseSchema);
