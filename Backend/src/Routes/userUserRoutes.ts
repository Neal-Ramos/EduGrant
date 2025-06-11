import { Router } from "express";
import { logoutUser } from "../Controller/userController";

const UserUserRoutes = Router();

UserUserRoutes.post("/logout", logoutUser);

export default UserUserRoutes