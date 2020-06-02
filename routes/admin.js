const express = require("express");
const path = require("path");
const rootDir = require("../util/path");

const adminController = require("../controllers/admin");

const router = express.Router();

const products = [];

router.use("/add-product", (req, res, next) => {
  res.render("add-products", { pageTitle: "sasha" });
});

router.post("/prod", (req, res, next) => {
  console.log(req.body);
  products.push({ title: req.body.title });

  res.redirect("/");
});
router.post("/addProd", adminController.addProduct);

exports.routes = router;
exports.products = products;
