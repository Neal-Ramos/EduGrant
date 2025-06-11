import { Router } from "express";
import { adminLogout } from "../Controller/adminUserControllers";

const AdminUserRoutes = Router();


AdminUserRoutes.post("/adminAddScholarships", adminLogout);

export default AdminUserRoutes;