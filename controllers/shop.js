const Product = require("../models/products");

exports.getProducts = (req, res, next) => {
  Product.find().then((products) => {
    // console.log(products);
    res.render("shop", { prods: products, pageTitle: "Shop", path: "/" });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-details", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};
