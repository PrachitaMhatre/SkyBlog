import express from "express";
import { GetSinglePost } from "../controllers/public.js";

const PublicRoutes = express.Router();

PublicRoutes.get("/Singlepost/:id", GetSinglePost);
export default PublicRoutes;
