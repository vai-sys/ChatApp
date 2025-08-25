import express from "express";
import { protectedRoute } from "../middleware/authMiddleware.js";
const router=express();
import { getUserForSidebar } from "../controllers/messageController.js";
import { getMessages } from "../controllers/messageController.js";
import { sendMessage } from "../controllers/messageController.js";

router.get("/user",protectedRoute,getUserForSidebar);
router.get("/:id",protectedRoute,getMessages);
router.post("/send/:id",protectedRoute,sendMessage);




export default router;