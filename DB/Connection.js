const mongoose = require('mongoose');

const URI ="mongodb+srv://sourabh:sourabh@cluster0.il3sa.mongodb.net/HoldersData?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log('db connected..!');
};

module.exports = connectDB;
