const express = require("express");
const path = require("path");
const rootDir = require("../util/path");
const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getProducts);

router.get("/product/:productId", shopController.getProduct);

module.exports = router;
