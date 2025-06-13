import { Router } from "express";
import {registerAccounts, loginAccounts, sendAuthCodeRegister, tokenAuthetication, sendAuthCodeLogin} from "../Controller/authControllers";
const UserAuthRoutes = Router();

UserAuthRoutes.post("/registerAccount", registerAccounts);
UserAuthRoutes.post("/loginAccounts", loginAccounts);
UserAuthRoutes.post("/sendAuthCodeRegister", sendAuthCodeRegister);
UserAuthRoutes.post("/sendAuthCodeLogin", sendAuthCodeLogin)
UserAuthRoutes.post("/tokenValidation", tokenAuthetication);

export default UserAuthRoutes