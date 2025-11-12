import userschema from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userschema.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Login", success: false });
    }


    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      message: "Login successful",
      data: {
        _id: user._id,
        name: user.username,
        email: user.email,
        role: user.role,
        token: token,
        ProfilePic:user.ProfilePic
      },
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", success: false });
  }
};
