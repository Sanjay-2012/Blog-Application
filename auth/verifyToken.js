import jwt from "jsonwebtoken";
import User from "../model/userModel.js"

export const authentication = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication Failed", success: false });
  }

  try {
    const token = authToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id ;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token", success: false });
  }
};


export const restrict = (roles) => async (req, res, next) => {
  try{
    const userId = req.userId
    const user = await User.findById(userId)
    const userRole = user.role

    if(!user){
      return res.status(400).json({message:"User not found!", success:false})
    }
    
    if(userRole=="user" && roles.includes("user")){
      next()
    }else if(userRole=="admin" && roles.includes("admin")){
      next()
    }else{
      return res.status(400).json({message:"You don't have the permission to access this route", success:false})
    }
  }catch(err){
      return res.status(500).json({message:"Internal Server Error", success:false})
  }
}