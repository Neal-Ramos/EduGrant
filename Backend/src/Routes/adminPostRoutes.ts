import { Router } from "express";
import upload from "../Config/upload";
import { adminAddScholarships, GetScholarshipsById, getScholarships } from "../Controller/adminPostControllers";

const AdminPostRoutes = Router();

AdminPostRoutes.post("/adminAddScholarships", upload.any() ,adminAddScholarships)
AdminPostRoutes.post("/getScholarshipsById", GetScholarshipsById)
AdminPostRoutes.get("/getScholarships", getScholarships)

export default AdminPostRoutes;