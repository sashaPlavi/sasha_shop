const Products = require("../models/products");

exports.getAddProducts = (req, res, next) => {
  res.render("add-products", {
    pageTitle: "sasha",
    path: "/admin/add-products",
  });
};

exports.addProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Products({ title, imageUrl, price, description });

  product
    .save()
    .then((result) => {
      console.log("prod created");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
