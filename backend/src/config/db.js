const mongoose = require("mongoose");

async function connectDB(uri) {
  try {
    await mongoose.connect(uri);
    const dbName = mongoose.connection?.name || new URL(uri).pathname.replace(/^\//, '') || '(unknown)';
    console.log(`MongoDB connected (db: ${dbName})`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

module.exports = { connectDB };
