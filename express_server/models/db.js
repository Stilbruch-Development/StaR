const mongoose = require("mongoose");

const uri = process.env.MONGODB_LOCAL || process.env.MONGODB_REMOTE;

mongoose.Promise = global.Promise;
mongoose.set("debug", true);

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
