const Products = require("../models/products");

exports.getProducts = (req, res, next) => {
  Products.find().then((products) => {
    // console.log(products);
    res.render("admin/a-products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/a-products",
    });
  });
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Products.findById(prodId)
    .then((product) => {
      res.render("admin/edit-product", {
        product: product,
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
      });
    })
    .catch((err) => console.log(err));
};
exports.getAddProducts = (req, res, next) => {
  res.render("add-products", {
    pageTitle: "Add Products",
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
exports.postEditProduct = (req, res, next) => {
  console.log(req.body);

  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  console.log(prodId);

  Products.findById(prodId)
    .then((product) => {
      console.log(product);

      product.title = updatedTitle;
      product.imageUrl = updatedImageUrl;
      product.price = updatedPrice;
      product.description = updatedDescription;
      return product.save();
    })
    .then((result) => {
      console.log("prod updated");
      res.redirect("/admin/a-products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.prodId;
  console.log(prodId);

  Products.findByIdAndRemove(prodId)
    .then(() => {
      console.log("destroy");
      res.redirect("/admin/a-products");
    })
    .catch((err) => console.log(err));
};
