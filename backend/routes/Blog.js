import express from "express";
import { Create, deletePost, getPosts, update } from "../controllers/Blog.js";
import { upload } from "../middleware/Multer.js";
import { isAdmin } from "../middleware/isAdmin.js";

const BlogRoutes = express.Router();
BlogRoutes.post("/create", isAdmin, upload.single("postimage"), Create);
BlogRoutes.patch("/update/:id", isAdmin, upload.single("postimage"), update);
BlogRoutes.get("/getposts", getPosts);
BlogRoutes.delete("/delete/:id", isAdmin, deletePost);

export default BlogRoutes;
