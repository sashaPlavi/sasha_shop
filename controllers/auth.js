const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  // const isLogedIn = req.get("Cookie").split(";")[1].trim().split("=")[1];
  // console.log(req.session);

  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuth: false,
  });
};
exports.postLogin = (req, res, next) => {
  User.findById("5edb29b975a7a8231cfe4a44")
    .then((user) => {
      req.session.user = user;
      req.session.isLogedIn = true;
      res.redirect("/");
      next();
    })
    .catch((err) => console.log(err));
};
exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
