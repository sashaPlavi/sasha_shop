exports.get404page = (req, res) => {
  res
    .status(404)
    .render("404", {
      pageTitle: "sasa",
      path: "/",
      isAuth: req.session.isLogedIn,
    });
};
