import express from "express";
import dotenv from "dotenv";
import DBCon from "./utils/db.js";
import AuthRoutes from "./routes/Auth.js";
import cookieParser from "cookie-parser";
import BlogRoutes from "./routes/Blog.js";
import DashboardRoutes from "./routes/Dashboard.js";
import CommentsRoutes from "./routes/Comments.js";
import PublicRoutes from "./routes/Public.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

DBCon();
app.get("/", (_req, res) => {
  res.send("Hello from backend!");
});
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
const corsOptoins = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptoins));
app.use("/auth", AuthRoutes);
app.use("/blog", BlogRoutes);
//app.use("/post", BlogRoutes);
app.use("/dashboard", DashboardRoutes);
app.use("/comment", CommentsRoutes);
app.use("/public", PublicRoutes);

app.use(express.static("./frontend/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
