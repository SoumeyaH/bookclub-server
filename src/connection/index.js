const mongoose = require("mongoose");

const DB_NAME = "book-club_db";
const DB_URL = `mongodb://localhost/${DB_NAME}`;

const MONGOOSE_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const mongoDBConnection = async () => {
  try {
    await mongoose.connect(DB_URL, MONGOOSE_OPTIONS);
    console.log("Successfully connected to MongoDB!");
  } catch (err) {
    console.log("Connection to MongoDB unsuccessful.");
    throw err;
  }
};

module.exports = mongoDBConnection;
