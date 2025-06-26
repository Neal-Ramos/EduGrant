import { Router } from "express";
import { getUserData, logoutUser } from "../Controller/userController";

const UserUserRoutes = Router();

UserUserRoutes.post("/logout", logoutUser);
UserUserRoutes.post("/getUser", getUserData)

export default UserUserRoutes