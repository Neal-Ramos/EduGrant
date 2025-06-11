import { Router } from "express";
import { getScholarships, getScholarshipsbyId } from "../Controller/postController";

const UserPostRoutes = Router();

UserPostRoutes.get("/getScholarship", getScholarships);
UserPostRoutes.post("/getScholarshipsByIdClient", getScholarshipsbyId);

export default UserPostRoutes;