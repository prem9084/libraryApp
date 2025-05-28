import mongoose from "mongoose";

const studentScheema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
    comeFrom: {
      type: String,
      required: true,
      default: () => new Date().toISOString(),
    },
    payment: {
      type: String,
      enum: ["PAID", "NOT PAID"],
      default: "NOT PAID",
    },
    studentIds: {
      front: {
        type: String,
      },
      back: {
        type: String,
      },
    },
    image: {
      type: String,
      default: "",
    },
    timing: {
      type: String,
      enum: ["12h", "24h"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentScheema);
