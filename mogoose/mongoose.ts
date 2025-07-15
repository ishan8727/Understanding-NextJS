import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/authApplication';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);

// Connection
export default async function connectDB() {
    if (mongoose.connections[0].readyState) {
        return;
    }
    try {
      console.log("Connecting to database..."+`${MONGODB_URI}`);
        await mongoose.connect(MONGODB_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
}