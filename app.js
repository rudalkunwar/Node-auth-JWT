const express = require("express");
const authRoutes = require("./routes/authRoutes");
const { default: mongoose } = require("mongoose");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

//database connection
const dbURI =
  "mongodb+srv://rudalkunwar:messi10@cluster0.frsepin.mongodb.net/user_details";
mongoose
  .connect(dbURI)
  .then((resule) => {
    console.log("Database Connection Established");
    app.listen(3000);
  })
  .then((error) => console.log(error));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//requested routes ------->
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/specials", (req, res) => {
  res.render("smoothie");
});

app.use(authRoutes);
