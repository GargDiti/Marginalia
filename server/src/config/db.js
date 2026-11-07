const mongoose = require("mongoose");
const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("DB connection failed: MONGO_URI or MONGODB_URI is not set in the environment");
    process.exitCode = 1;
    throw new Error("MongoDB URI is not set");
  }

  try {
    await mongoose.connect(mongoUri);
    console.log(`MongoDB connected (readyState: ${mongoose.connection.readyState})`);
  } catch (err) {
    console.error("DB connection failed:", err.message);
    process.exitCode = 1;
    throw err;
  }
};

module.exports = connectDB;
