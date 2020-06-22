const express = require("express");
const bP = require("body-parser");
const path = require("path");
const port = 3003;
const mongoDB = "mongodb://localhost:mydb/my_database";
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const csurf = require("csurf");

const app = express();
const store = new MongoStore({
  uri: mongoDB,
  collection: "sessions",
});
const csrfProtect = csurf();

// seting templating angine
app.set("view engine", "ejs");
app.set("views", "views");

const errorController = require("./controllers/error");
const User = require("./models/user");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const mongoose = require("mongoose");

// db setup
var db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   // we're connected!
//   console.log("db conected");
// })
app.use(bP.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret :)",
    resave: false,
    saveUninitialized: false,
    store,
  })
);
app.use(csrfProtect);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuth = req.session.isLogedin;
  res.locals.csrfToken = req.csrfToken();

  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404page);
mongoose.connect(mongoDB, { useNewUrlParser: true });
app.listen(port, () => {
  console.log("app listening at " + port);
});
