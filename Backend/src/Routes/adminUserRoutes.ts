import { Router } from "express";
import { adminLogout } from "../Controller/adminUserControllers";

const AdminUserRoutes = Router();


AdminUserRoutes.post("/adminLogout", adminLogout);

export default AdminUserRoutes;