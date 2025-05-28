import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Accept specific file fields
export const uploadStudentFiles = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "studentIdFront", maxCount: 1 },
  { name: "studentIdBack", maxCount: 1 },
]);
