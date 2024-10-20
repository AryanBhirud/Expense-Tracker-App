const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const Category = require("../models/Category");

// @route   GET /expenses
// @desc    Get all expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /expenses
// @desc    Add a new expense
router.post("/", async (req, res) => {
  const expense = new Expense({
    userID: req.body.userID,
    category: req.body.category,
    amount: req.body.amount,
    description: req.body.description,
    date: req.body.date
  });

  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   PUT /expenses/:id
// @desc    Update an expense
router.put("/:id", async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json(updatedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE /expenses/:id
// @desc    Delete an expense
router.delete("/:id", async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /categories
// @desc    Get all categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /categories
// @desc    Add a new category
router.post("/categories", async (req, res) => {
  const category = new Category({
    name: req.body.name
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   GET /expenses/report/monthly
// @desc    Generate monthly spending report
router.get("/report/monthly", async (req, res) => {
  try {
    const report = await Expense.aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          totalSpent: { $sum: "$amount" }
        }
      }
    ]);
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
