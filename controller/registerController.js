import User from "../model/userModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
  try {
    const { email, username, phonenumber, profilepic, role, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists", success: false });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

   
    const newUser = new User({
      email,
      username,
      phonenumber,
      profilepic,
      role,
      password: hashedPassword, 
    });


    await newUser.save();

  
    res.status(201).json({
      message: "User registered successfully",
      success: true, 
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
