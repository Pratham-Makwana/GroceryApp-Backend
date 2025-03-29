import mongoose from "mongoose";

export const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 60000, 
      socketTimeoutMS: 45000,
    });
    // mongoose.set("debug", true);

    console.log("✅ DB Connected Successfully!");
  } catch (error) {
    console.error("❌ Database connection error:", error);
  }
};
