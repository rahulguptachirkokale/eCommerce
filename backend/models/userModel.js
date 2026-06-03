const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true},
  admin:{type:Boolean,default: true,required: true},
  location: String,
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
