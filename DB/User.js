const mongoose = require('mongoose');

const user =  mongoose.Schema({
  HolderAddress: {
    type: String
  },
  HolderBalance: {
    type: String
  }
});

module.exports = User = mongoose.model('user', user);
