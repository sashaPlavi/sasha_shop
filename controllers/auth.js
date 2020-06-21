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
  console.log("post bla");

  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((match) => {
          if (match) {
            req.session.user = user;
            req.session.isLogedIn = true;
            return req.session.save((err) => {
              console.log(err);
              console.log("bla Auth");

              res.redirect("/");
            });
          }
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
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
