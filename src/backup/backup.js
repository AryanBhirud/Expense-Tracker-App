const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const backupExpenses = async () => {
  const expenses = await mongoose.model("Expense").find();
  fs.writeFileSync(path.join(__dirname, "backup.json"), JSON.stringify(expenses, null, 2));
  console.log("Backup completed");
};

module.exports = { backupExpenses };

