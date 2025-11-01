const mongoose = require('mongoose');

const MONGO_URL = 'mongodb://127.0.0.1:27017/MGNREGA';

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
}

module.exports = connectDB; // ✅ export the function

