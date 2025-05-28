import mongoose from "mongoose";

const userScheema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "password length must be 6 charactor"],
    },
    image: {
      type: String,
      default: "https://avatar.iran.liara.run/public/male",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userScheema);
