import express from "express";
import { createAdmin, loginAdmin } from "../controller/adminController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/createAdmin", authMiddleware(["admin"]), createAdmin);    
router.post("/loginAdmin", loginAdmin);

export default router;