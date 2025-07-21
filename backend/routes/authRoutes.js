import express from "express";
const router=express.Router();
import {signup,login,logout} from "../controllers/authController.js"
import { protectedRoute } from "../middleware/authMiddleware.js";
import { UpdateProfile } from "../controllers/authController.js";

router.post("/signup" ,signup);
router.post("/login",login);
router.post("/logout",logout);
router.put("/profile",protectedRoute,UpdateProfile);
export default router;