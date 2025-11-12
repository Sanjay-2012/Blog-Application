import User from "../model/userModel.js";
import bcrypt from "bcrypt";

export const editUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { password, ...others } = req.body;

    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      others.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: others },
      { success: true }
    );

    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
};


export const deleteUser = async(req, res) => {
  const userId = req.params.id
  console.log(userId);
  try{
    if(!userId){
      return res.status(400).json({message:"Invalid ID", success:false})
    }
    await User.findByIdAndDelete(userId)
    return res.status(200).json({message:"User deleted Successfully", success:true})
  }catch(err){
    return res.status(500).json({message:"Internal Server Error..", success:false})
  }
}

export const getProfile = async(req, res, next) => {
  const userId = req.userId

  try{
    if(!userId){
      return res.status(400).json({message:"Invalid ID", success:false})
    }
    const user = await User.findById(userId)

    const {password, ...rest} = user._doc

    return res.status(200).json({message:"Profile got Successfully", success:true , profileDetails:{...rest}})

  }catch(err){
    return res.status(500).json({message:"Internal Server Error", success:false})
  }
}

export const getAllUsers = async(req, res, next) => {
  try{
    const users = await User.find()

    if(!users){
      return res.status(400).json({message:"Users not Found", success:false})
    }
    return res.status(200).json({message:"Users got successfully", success:true, users})
  }catch(err){
    return res.status(500).json({message:"Internal Server Error", success:false})
  }
}