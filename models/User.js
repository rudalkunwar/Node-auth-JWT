const mongoose = require("mongoose");
const { isEmail } = require('email-validator');
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail.validate, "Please Enter Valid Email"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "The password should have minimum of 6 characters"],
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email,password){
  const user = await this.findOne({email});
  if(user){
    const auth = await bcrypt.compare(password,user.password);
    if(auth){
      return user;
    }
    throw Error('Incorrect Password');
  }
  throw Error('User doesnot exists');
}

const User = mongoose.model("user", userSchema);

module.exports = User;
