import express from "express";
import {
  getProfile,
  UpdateProfile,
  userLogin,
  userRegister,
} from "../controllers/userController.js";

import isVerify from "../middleware/AuthMiddeleware.js";
import { uploadStudentFiles } from "../middleware/multer.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/get-profile/:id", isVerify, getProfile);
router.put("/update-profile/:id", isVerify, uploadStudentFiles, UpdateProfile);

router.get("/privet", isVerify, (req, res) => {
  res.status(200).json({ success: true, ok: true });
});

export default router;
