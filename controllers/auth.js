exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuth: req.isLogedIn,
  });
};
exports.postLogin = (req, res, next) => {
  req.isLogedIn = true;
  res.redirect("/");
};
