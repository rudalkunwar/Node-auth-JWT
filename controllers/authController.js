const User = require("../models/user");
const errorHandeler = (err) => {
  const errors = { email: "", password: "" };
  //duplicate error 
  if(err.code == 11000 ){
    errors['email']='Email already registered';
    return errors;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
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
    res.status(201).json("User created Sucessfully");
  } catch (err) {
    const errors = errorHandeler(err);
    res.send(errors);
  }
};
module.exports.user_login = (req, res) => {
  const { email, password } = req.body;
};
