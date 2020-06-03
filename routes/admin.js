const express = require("express");
const path = require("path");
const rootDir = require("../util/path");

const adminController = require("../controllers/admin");

const router = express.Router();

const products = [];

router.use("/add-products", adminController.getAddProducts);

router.post("/addProducts", adminController.addProduct);

module.exports = router;
