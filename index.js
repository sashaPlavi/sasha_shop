const express = require("express");
const bP = require("body-parser");
const path = require("path");
const port = 3003;
const mongoDB = "mongodb://localhost:mydb/my_database";
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);

const app = express();
const store = new MongoStore({
  uri: mongoDB,
  collection: "sessions",
});

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

app.use((req, res, next) => {
  User.findById("5edb29b975a7a8231cfe4a44")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404page);
mongoose.connect(mongoDB, { useNewUrlParser: true }).then((result) => {
  User.findOne().then((user) => {
    if (!user) {
      const user = new User({
        name: "Sasha",
        email: "Sasha@sasha",
        cart: {
          items: [],
        },
      });
      user.save();
    }
  });
});
app.listen(port, () => {
  console.log("app listening at " + port);
});
