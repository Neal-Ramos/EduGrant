import { Router } from "express";
import {registerAccounts, loginAccounts, sendAuthCode, tokenAuthetication} from "../Controller/authControllers";
const UserAuthRoutes = Router();

UserAuthRoutes.post("/registerAccount", registerAccounts)
UserAuthRoutes.post("/login", loginAccounts)
UserAuthRoutes.post("/sendAuthCode", sendAuthCode)
UserAuthRoutes.post("/tokenValidation", tokenAuthetication)

export default UserAuthRoutes