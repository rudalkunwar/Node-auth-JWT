const User = require('../models/user');
console.log(User);
module.exports.register_page = (req, res) => {
  res.render("register");
};
module.exports.login_page = (req, res) => {
  res.render("login");
};
module.exports.user_register = async (req, res) => {
 try{
  const {email,password} = req.body;
  const user = await User.create({email,password});
  res.status(201).send("User created Sucessfully");
 }catch(err){
  res.status(400). res.send("Error creating user");
 }
};
module.exports.user_login = (req, res) => {
  const {email,password} = req.body;
};
