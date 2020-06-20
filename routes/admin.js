const express = require("express");
const path = require("path");
const rootDir = require("../util/path");
const isAuth = require("../middleware/isAuth");

const adminController = require("../controllers/admin");

const router = express.Router();

router.use("/a-products", isAuth, adminController.getProducts);
router.use("/add-products", isAuth, adminController.getAddProducts);
router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post("/addProducts", isAuth, adminController.postAddProduct);
router.post("/edit-product/", isAuth, adminController.postEditProduct);

router.post("/delete-product", isAuth, adminController.deleteProduct);

module.exports = router;
