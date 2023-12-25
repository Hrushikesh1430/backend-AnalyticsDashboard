const express = require("express");
const mongoose = require("mongoose");
const XLSX = require("xlsx"); // Library to read Excel files
const dotenv = require("dotenv");
const cors = require("cors");

const { initializeDatabase } = require("./db/db");

const auth = require("./routers/public/auth.router");
const users = require("./routers/protected/user-details.router");
const charts = require("./routers/protected/chart.router");

const { authVerify } = require("./middlewares/auth-verify-middleware");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// To insert data

// const workbook = XLSX.readFile("./dataSheet/Frontend_Developer_Assignment_Data.xlsx");
// const sheetName = workbook.SheetNames[0];
// const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

// excelData.forEach((row) => {
//   row["Day"] = new Date(Math.round((row["Day"] - 25569) * 86400 * 1000));
// });

// Data.insertMany(excelData)
//   .then(() => console.log("Data inserted into MongoDB"))
//   .catch((err) => console.error(err));

initializeDatabase();

app.use("/user-details", authVerify, users);
app.use("/chartinfo", authVerify, charts);
app.use("/auth", auth);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
