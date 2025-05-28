import { v2 as cloudinary } from "cloudinary";
import studentScheema from "../models/studentScheema.js";

export const AddStudent = async (req, res) => {
  try {
    const { fullname, email, phone, address, comeFrom, payment, timing } =
      req.body;
    const userId = req.user._id;
    const imageFile = req.files?.image?.[0];
    const studentIdFront = req.files?.studentIdFront?.[0];
    const studentIdBack = req.files?.studentIdBack?.[0];

    // Validate required fields
    if (!fullname) {
      return res.json({
        success: false,
        message: "Full Name is Required",
      });
    }
    if (!email) {
      return res.json({
        success: false,
        message: "Email is Required",
      });
    }
    if (!phone) {
      return res.json({
        success: false,
        message: "Phone Number is required",
      });
    }
    if (!address) {
      return res.json({
        success: false,
        message: "Address is  required",
      });
    }
    if (!comeFrom) {
      return res.json({
        success: false,
        message: "Date Of joining is required",
      });
    }

    if (!payment) {
      return res.json({
        success: false,
        message: "Payment is required",
      });
    }
    if (!timing) {
      return res.json({
        success: false,
        message: "timing is required",
      });
    }

    if (!imageFile) {
      return res.json({
        success: false,
        message: "Student image is required",
      });
    }
    if (!studentIdFront) {
      return res.json({
        success: false,
        message: "Front Copy is required",
      });
    }
    if (!studentIdBack) {
      return res.json({
        success: false,
        message: "Back Copy is required",
      });
    }

    // Upload student profile photo
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    // Upload front and back of student ID
    const frontUpload = await cloudinary.uploader.upload(studentIdFront.path, {
      resource_type: "image",
    });

    const backUpload = await cloudinary.uploader.upload(studentIdBack.path, {
      resource_type: "image",
    });

    // Save student data
    const student = await studentScheema.create({
      fullname,
      email,
      phone,
      address,
      comeFrom,
      payment,
      timing,
      image: imageUpload.secure_url,
      studentIds: {
        front: frontUpload.secure_url,
        back: backUpload.secure_url,
      },
      createdBy: userId,
    });

    res.status(200).json({
      success: true,
      message: "Student Added Successfully",
      student,
    });
  } catch (error) {
    console.error("Error in AddStudent:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// for update student

export const UpdateStudent = async (req, res) => {
  try {
    const { fullname, email, phone, address, comeFrom, payment, timing } =
      req.body;

    const imageFile = req.files?.image?.[0];
    const studentIdFront = req.files?.studentIdFront?.[0];
    const studentIdBack = req.files?.studentIdBack?.[0];

    // Check if student exists
    const existingStudent = await studentScheema.findById(req.params.id);
    if (!existingStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Upload new files if provided, otherwise use existing URLs
    const imageUpload = imageFile
      ? await cloudinary.uploader.upload(imageFile.path, {
          resource_type: "image",
        })
      : { secure_url: existingStudent.image };

    const frontUpload = studentIdFront
      ? await cloudinary.uploader.upload(studentIdFront.path, {
          resource_type: "image",
        })
      : { secure_url: existingStudent.studentIds?.front || "" };

    const backUpload = studentIdBack
      ? await cloudinary.uploader.upload(studentIdBack.path, {
          resource_type: "image",
        })
      : { secure_url: existingStudent.studentIds?.back || "" };

    // Update student in DB
    const updatedStudent = await studentScheema.findByIdAndUpdate(
      req.params.id,
      {
        fullname,
        email,
        phone,
        address,
        comeFrom,
        payment,
        timing,
        image: imageUpload.secure_url,
        studentIds: {
          front: frontUpload.secure_url,
          back: backUpload.secure_url,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Student Updated Successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error("Error in UpdateStudent:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// for delete student

export const deleteStudent = async (req, res) => {
  try {
    const student = await studentScheema.findByIdAndDelete(req.params.id);
    res.status(200).send({ success: true, message: "Studen deleted", student });
  } catch (error) {
    console.error("Error in AddStudent:", error);
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// get Added Student

export const getAllStudent = async (req, res) => {
  try {
    const userId = req.user._id;
    const student = await studentScheema.find({ createdBy: userId });

    res.status(200).send({ success: true, student });
  } catch (error) {
    console.error("Error in AddStudent:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getSingleStudent = async (req, res) => {
  try {
    const student = await studentScheema.findById(req.params.id);
    if (!student) {
      return res.json({ success: false, message: "Studet not found" });
    }
    if (student.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    res.status(200).send({ success: true, student });
  } catch (error) {
    console.error("Error in AddStudent:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
