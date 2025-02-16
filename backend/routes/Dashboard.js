import express from "express";
import { isAdmin } from "../middleware/isAdmin.js";
import { Getalldata, GetUser, Userdelete } from "../controllers/Dashboard.js";

const DashboardRoutes = express.Router();

DashboardRoutes.get("/", isAdmin, Getalldata);
DashboardRoutes.get("/getusers", isAdmin, GetUser);
DashboardRoutes.delete("/deleteuser/:id", Userdelete);

export default DashboardRoutes;
