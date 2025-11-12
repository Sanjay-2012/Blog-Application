import express from "express"
import { createBlog, deleteBlog, updateBlog, getAllBlogs, getBlogById, getBlogByTopic } from "../controller/blogController.js"
import { authentication, restrict } from "../auth/verifyToken.js"

const route = express.Router()

route.get("/getallblogs", getAllBlogs)
route.get("/getsingleblog/:id", getBlogById)
route.get("/getblogbytopic/:topic", getBlogByTopic)
route.post("/createblog", authentication, restrict(["user"]), createBlog)
route.put("/editblog/:id", authentication, restrict(["user"]), updateBlog)
route.delete("/deleteblog/:id",authentication, restrict(["user"]), deleteBlog)

export default route