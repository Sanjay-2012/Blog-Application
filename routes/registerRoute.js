import express from "express"
import {  register } from "../controller/registerController.js"
import { login } from "../controller/loginController.js"


const route = express.Router()

route.post("/register", register)
route.post("/login",login)

export default route