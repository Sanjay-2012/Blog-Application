import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  ProfilePic: {
    type: String,
    required: false, 
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "manager"],
    default: "user",
  },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
