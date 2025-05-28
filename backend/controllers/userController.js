import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
export const userRegister = async (req, res) => {
  try {
    const { fullname, email, password, image } = req.body;
    // validations

    if (!fullname) {
      return res.json({ success: false, message: "Full name is required" });
    }
    if (!email) {
      return res.json({ success: false, message: "Email required" });
    }
    if (!password) {
      return res.json({ success: false, message: "Password is required" });
    }

    // user

    const ExistingUser = await userModel.findOne({ email });

    if (ExistingUser) {
      return res.json({
        success: false,
        message: "User Allready registered whith this email is",
      });
    }

    // hashing password

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      fullname,
      email,
      image,
      password: hashPassword,
    });

    res
      .status(200)
      .json({ success: true, message: "User Register Successfully", user });
  } catch (error) {
    console.log(error);
    res.json("error in User Registration", error);
  }
};

export const UpdateProfile = async (req, res) => {
  try {
    const { fullname, email } = req.body;
    let updatedData = { fullname, email };

    // Check if image was uploaded
    const imageFile = req.files?.image?.[0];
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      updatedData.image = imageUpload.secure_url;
    }

    const user = await userModel.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    res
      .status(200)
      .json({ success: true, message: "Profile Updated Successfully", user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error updating profile", error });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and Password required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User is not registred with this email id",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.json({
        success: false,
        message: "Email and Password Invalid",
      });
    }

    const token = await jwt.sign({ _id: user._id }, process.env.JWT, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "User loogedIn Successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        image: user.image,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.json("error in User Registration", error);
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select("-password");
    if (!user) {
      res.json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json("error in User Registration", error);
  }
};
