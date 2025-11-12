import Blog from "../model/blogModel.js";
import User from "../model/userModel.js";


// ✅ Create Blog

export const createBlog = async (req, res) => {
  const { title, content, image } = req.body;
  const userId = req.userId;

  try {

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: No user ID" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const existingBlog = await Blog.findOne({ "user.id": userId, title });
    if (existingBlog) {
      return res.status(400).json({
        success: false,
        message: "A blog with this title already exists. Please use a different title.",
      });
    }

    const newBlog = new Blog({
      title,
      content,
      image,
      user: {
        id: userId,
        name: user.username,
      },
    });

    await newBlog.save();

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ✅ Get All Blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
    res.status(200).json({
      success: true,
      data: blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ✅ Get Single Blog by ID

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("user", "_id name");
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message });
  }
};

// ✅ Get  Blog by Topic

export const getBlogByTopic = async (req, res) => {
  try {
    const { topic } = req.params;
    const blog = await Blog.find({topic:topic});
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message });
  }
};


// ✅ Update Blog
export const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body);
    if (!updatedBlog)
      return res.status(404).json({ success: false, message: "Blog not found" });

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Blog
export const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog)
      return res.status(404).json({ success: false, message: "Blog not found" });

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
