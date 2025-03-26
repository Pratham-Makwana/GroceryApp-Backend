// import mongoose from "mongoose";

// export const connectDB = async (uri) => {
//   try {
//     await mongoose.connect('mongodb+srv://makwanapratham13:workpratham583@cluster0.gub2u.mongodb.net/grocery_app?retryWrites=true&w=majority&appName=Cluster0',

//     );
//     console.log("DB Connected");
//   } catch (error) {
//     console.log("Database connection error", error);
//   }
// };

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
