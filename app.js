const express = require("express");
const authRoutes = require("./routes/authRoutes");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const { requireAuth } = require("./middlewares/authMiddleware");
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
  .catch((error) => console.log("Unable to Connect to Database"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//requested routes ------->
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/specials", requireAuth, (req, res) => {
  res.render("smoothie");
});
app.get("/admin",requireAuth, (req, res) => {
  res.render("dashboard");
});
app.use(authRoutes);
