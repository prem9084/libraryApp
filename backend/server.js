import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import AuthRoute from "./routes/AuthRoute.js";
import StudentRoute from "./routes/StudentRoute.js";
const app = express();
const PORT = process.env.PORT || 5000;
connectCloudinary();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// routes

app.use("/api/auth", AuthRoute);
app.use("/api/student", StudentRoute);

app.listen(PORT, () => {
  console.log(`Server listing on port ${PORT}`);
  connectDB();
});
