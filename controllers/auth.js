exports.getLogin = (req, res, next) => {
  const isLogedIn = req.get("Cookie").split(";")[1].trim().split("=")[1];
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuth: isLogedIn,
  });
};
exports.postLogin = (req, res, next) => {
  res.setHeader("Set-Cookie", "logedIn=true ; HttpOnly");
  res.redirect("/");
};
