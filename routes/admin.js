const express = require("express");
const path = require("path");
const rootDir = require("../util/path");

const adminController = require("../controllers/admin");

const router = express.Router();

router.use("/a-products", adminController.getProducts);
router.use("/add-products", adminController.getAddProducts);
router.get("/edit-product/:productId", adminController.getEditProduct);

router.post("/addProducts", adminController.postAddProduct);
router.post("/edit-product/", adminController.postEditProduct);

router.post("/delete-product", adminController.deleteProduct);

module.exports = router;
