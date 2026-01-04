const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all products
router.get("/", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// ADD product (admin)
router.post("/", (req, res) => {
  const { title, price, stock, image } = req.body;

  db.query(
    "INSERT INTO products (title, price, stock, image) VALUES (?, ?, ?, ?)",
    [title, price, stock, image],
    err => {
      if (err) return res.status(500).send(err);
      res.send("Product added successfully ✅");
    }
  );
});

module.exports = router;
