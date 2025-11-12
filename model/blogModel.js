import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    topic: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    user: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", 
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;

