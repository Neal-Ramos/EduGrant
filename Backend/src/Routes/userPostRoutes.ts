import { Router } from "express";
import { getAllScholarships, getScholarshipsbyId } from "../Controller/postController";

const UserPostRoutes = Router();

UserPostRoutes.get("/getAllScholarships", getAllScholarships);
UserPostRoutes.post("/getScholarshipsByIdClient", getScholarshipsbyId);

export default UserPostRoutes;