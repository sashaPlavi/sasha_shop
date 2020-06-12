exports.getLogin = (req, res, next) => {
  // const isLogedIn = req.get("Cookie").split(";")[1].trim().split("=")[1];
  console.log(req.session);

  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuth: false,
  });
};
exports.postLogin = (req, res, next) => {
  req.session.isLogedIn = true;
  res.redirect("/");
};
