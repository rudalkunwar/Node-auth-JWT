const User = require("../models/user");
const jwt = require("jsonwebtoken");

const errorHandeler = (err) => {
  const errors = { email: "", password: "" };
  //duplicate error
  if (err.code == 11000) {
    errors["email"] = "Email already registered";
    return errors;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "SecrtRudalKeyYes", { expiresIn: maxAge });
};

module.exports.register_page = (req, res) => {
  res.render("register");
};
module.exports.login_page = (req, res) => {
  res.render("login");
};
module.exports.user_register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwttokencookie", token, { maxAge: maxAge * 1000 });
    res.status(201).json({ message: "User created Sucessfully" });
  } catch (err) {
    const errors = errorHandeler(err);
    res.send(errors);
  }
};
module.exports.user_login = (req, res) => {
  const { email, password } = req.body;
};
