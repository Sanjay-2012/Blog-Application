import express from "express"
import { deleteUser, editUser, getAllUsers, getProfile } from "../controller/userController.js"
import { authentication, restrict } from "../auth/verifyToken.js"
const router = express.Router()

router.put("/edituser/:id", authentication, editUser)
router.delete("/deleteuser/:id", authentication, restrict(["admin"]), deleteUser)
router.get("/getallusers", authentication, restrict(["admin"]), getAllUsers)
router.get("/me", authentication, restrict(["user"]), getProfile)

export default router