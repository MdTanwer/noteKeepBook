import mongoose from "mongoose";

// MongoDB connection function that can be exported and used elsewhere
export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(
      "mongodb+srv://tanwirisrafil:hSW1lfw5OO1iKfvm@demo.ldotqmm.mongodb.net/?retryWrites=true&w=majority&appName=demo"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
