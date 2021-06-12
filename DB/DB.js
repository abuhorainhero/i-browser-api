const mongoose = require("mongoose");
const dbUrl = process.env.DB_URI
if (!dbUrl) {
  console.error("Momgo url not set in env file");
  return new Error("Momgo url not set in env file");
}

mongoose.connect(
  dbUrl,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error(`failed to connect using mongoose : ${err}`);
    } else {
      console.log(`connected to DATA_BASE server`);
    }
  }
);
