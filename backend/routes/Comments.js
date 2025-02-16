import express from "express";
import { AddComment } from "../controllers/Comment.js";
import { isLogin } from "../middleware/isAdmin.js";

const CommentsRoutes = express.Router();

CommentsRoutes.post("/addcomment", isLogin, AddComment);

export default CommentsRoutes;
