import express from "express";
import { createCertificate, getOneCertificate, getAllCertificates, deleteCertificate } from "../controller/cartificateController.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();

router.post("/create", authMiddleware(['admin']), createCertificate);
router.get("/getOne", getOneCertificate);
router.get("/getAll", authMiddleware(['admin']), getAllCertificates);
router.delete("/delete/:id", authMiddleware(['admin']), deleteCertificate);

export default router;