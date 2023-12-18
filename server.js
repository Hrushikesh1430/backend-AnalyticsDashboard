const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const XLSX = require("xlsx"); // Library to read Excel files

const app = express();

app.use(cors());

const dataSchema = new mongoose.Schema({
  Day: String,
  Age: String,
  Gender: String,
  A: Number,
  B: Number,
  C: Number,
  D: Number,
  E: Number,
  F: Number,
});

const Data = mongoose.model("Data", dataSchema);

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

const initializeDatabase = async () => {
  try {
    const connection = await mongoose.connect("mongodb+srv://hdtawde:x63rTANOwPr3CxQi@cluster0.zmfw5yl.mongodb.net/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connection) {
      console.log("Connected Successfully");
    }
  } catch (error) {
    console.log("Connection Failed", error);
  }
};
initializeDatabase();

app.get("/api/chartinfo", async (req, res) => {
  try {
    const chartData = await Data.find({});
    res.status(200).json({ chartData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// MongoDB connection
// mongoose.connect("mongodb+srv://hdtawde:x63rTANOwPr3CxQi@cluster0.zmfw5yl.mongodb.net/", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
