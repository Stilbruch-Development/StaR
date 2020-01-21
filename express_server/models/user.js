const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: "Please provide an email!",
    unique: true
  },
  password: {
    type: String,
    required: "Please provide a password!"
  },
  first_name: {
    type: String,
    required: "Please provide a firstname!"
  },
  last_name: {
    type: String,
    required: "Please provide a lastname!"
  },
  privacy_policy_approval: {
    type: Boolean,
    default: false
  },
  privacy_policy_approval_date: {
    type: Date,
    default: null
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);
