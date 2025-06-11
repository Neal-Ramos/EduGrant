import { Router } from "express";
import { adminCodeAuthentication, adminLogIn, adminTokenAuthentication } from "../Controller/adminAuthControllers";

const AdminAuthRoutes = Router();

AdminAuthRoutes.post("/adminLogin", adminLogIn);
AdminAuthRoutes.post("/adminCodeAuthentication", adminCodeAuthentication);
AdminAuthRoutes.post("/adminTokenAuthentication", adminTokenAuthentication);

export default AdminAuthRoutes;