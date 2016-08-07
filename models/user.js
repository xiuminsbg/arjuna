const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const uuid = require('uuid');

var userSchema = mongoose.Schema({
  local: {
    email: String,
    password: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  }
});

// Generating a hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Check if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
