const express = require("express");
const bP = require("body-parser");
const path = require("path");
const port = 3003;

const app = express();

// seting templating angine
app.set("view engine", "pug");
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const mongoose = require("mongoose");

// db setup
const mongoDB = "mongodb://localhost:mydb/my_database";
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("db conected");
});

app.use(bP.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(adminData.routes);
app.use(shopRoutes);
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "fileNotFound.html"));
});

app.listen(port, () => {
  console.log("app listening at " + port);
});
