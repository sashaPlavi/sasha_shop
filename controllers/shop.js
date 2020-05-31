const Product = require("../models/products");

exports.getProducts = (req, res, next) => {
  Product.find().then((products) => {
    console.log(products);
  });
};
