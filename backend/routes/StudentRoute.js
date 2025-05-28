import express from "express";
import {
  AddStudent,
  deleteStudent,
  getAllStudent,
  getSingleStudent,
  UpdateStudent,
} from "../controllers/StudentController.js";
import { uploadStudentFiles } from "../middleware/multer.js";
import isVerify from "../middleware/AuthMiddeleware.js";

const router = express.Router();

router.post("/add-student", isVerify, uploadStudentFiles, AddStudent);
router.put("/update-student/:id", isVerify, uploadStudentFiles, UpdateStudent);
router.get("/get-student", isVerify, getAllStudent);
router.get("/get-single-student/:id", isVerify, getSingleStudent);
router.delete("/delete-student/:id", isVerify, deleteStudent);

export default router;
