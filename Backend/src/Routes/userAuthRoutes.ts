import { Router } from "express";
import {registerAccounts, loginAccounts, codeAuthentication, tokenAuthetication} from "../Controller/authControllers";
const UserAuthRoutes = Router();

UserAuthRoutes.post("/registerAccount", registerAccounts)
UserAuthRoutes.post("/login", loginAccounts)
UserAuthRoutes.post("/codeAuthentication", codeAuthentication)
UserAuthRoutes.post("/tokenValidation", tokenAuthetication)

export default UserAuthRoutes