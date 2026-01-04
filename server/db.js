const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ambition_paper_products"
});

db.connect(err => {
  if (err) {
    console.log("Database error ❌");
    throw err;
  }
  console.log("Database connected ✅");
});

module.exports = db;
