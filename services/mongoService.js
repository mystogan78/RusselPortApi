const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    if (process.env.NODE_ENV !== 'test') {
      console.log('MongoDB connecté');
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
