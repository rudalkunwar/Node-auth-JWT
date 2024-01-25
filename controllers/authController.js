const User = require("../models/User");
const jwt = require("jsonwebtoken");

const errorHandeler = (err) => {
  const errors = { email: "", password: "" };
  if (err.message.includes("Incorrect Password")) {
    errors["password"] = "Incorrect Password";
  }if(err.message.includes("User doesnot exists")){
    errors["email"] = "User doesnot exists";
  }
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
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({user:user._id});
  } catch (err) {
    const errors = errorHandeler(err);
    res.send(errors);
  }
};
module.exports.user_login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({user:user._id});
  } catch (err) {
    const errors = errorHandeler(err);
    res.send(errors);
  }
};
