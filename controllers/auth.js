const bcrypt = require("bcryptjs");

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
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};
exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
exports.getSingup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuth: false,
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.redirect("/signup");
      }
      return bcrypt.hash(password, 12).then((hashPassword) => {
        const user = new User({
          email,
          password: hashPassword,
          cart: { items: [] },
        });
        return user.save();
      });
    })
    .then((result) => {
      res.redirect("/login");
    })
    .catch((err) => console.log(err));
};
