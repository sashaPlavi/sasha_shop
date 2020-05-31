const express = require("express");
const path = require("path");
const rootDir = require("../util/path");
const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getProducts);

module.exports = router;
