const express = require("express");
const bP = require("body-parser");
const path = require("path");
const port = 3003;
const app = express();
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bP.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(adminRoutes);
app.use(shopRoutes);
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "fileNotFound.html"));
});

app.listen(port, () => {
  console.log("app listening at " + port);
});
