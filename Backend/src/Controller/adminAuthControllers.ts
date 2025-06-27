import { NextFunction, Request, Response } from "express";
import { Mailer } from "../Config/mailer";
import { randomBytes } from "crypto";
import { sign, verify } from "jsonwebtoken";
import { getAdminByEmailPassword } from "../Models/adminAccountsModels";
import { deleteCodeByEmailOrigin, selectCodeByCodeEmailOrigin, selectExistingCodeByEmailOrigin } from "../Models/securityCodeModels";
import { TokenPayload } from "../Types/userAuthTypes";



export const adminLogIn = async (req:Request, res: Response, next: NextFunction): Promise<void>=> {
    try {
        const {adminEmail, adminPassword} = req.body
        if(!adminEmail || !adminPassword){
            res.status(400).json({success:false, message:"Fill All Credentials"});
            return;
        }
        const correctCredenatials = await getAdminByEmailPassword(adminEmail, adminPassword)
        if(!correctCredenatials.length){
            res.status(400).json({success:false, message:"Invalid Credentials"});
            return;
        }
        const checkExistCode = await selectExistingCodeByEmailOrigin(adminEmail, "adminLogin")
        if(checkExistCode.length){
            const expiresAt = new Date(checkExistCode[0].expiryDate).getTime();
            if(expiresAt > Date.now()){
                res.status(200).json({success: true, message: "Code Already Sent!!!"});
                return;
            }
        }
        const sendCode = randomBytes(3).toString("hex");
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        const mailOptions = {
            from:process.env.MAILER_EMAIL_CREDENTIAL,
            to:process.env.TRUSTED_EMAIL_USER,
            subject:"Admin Login Code",
            text:`Your Admin Login code is ${sendCode} if this is not you please ignore this email!!`,
            html:""
        }
        const sendMail = await Mailer(mailOptions, "adminLogin", adminEmail, sendCode, expiresAt)
        if(sendMail.success === false){
            res.status(500).json({success:false, message:"Email Not Sent!!", error:sendMail.error.message});
            return;
        }
        res.status(200).json({ success: true, message: "Email Sent!!" });
    } catch (error) {
        next(error)
    }
};

export const adminCodeAuthentication = async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
    try {
        const {code, adminPassword, adminEmail} = req.body;
        if(!code || !adminPassword || !adminEmail){
            res.status(400).json({success:false, message:"Fill All Credentials"});
            return;
        }
        const validAccount = await getAdminByEmailPassword(adminEmail, adminPassword);// Valiate Account
        if(!validAccount.length){
            res.status(400).json({success: false, message: "Invalid Credentials!!"});
            return;
        }
        const codeRecord = await selectCodeByCodeEmailOrigin(code, adminEmail, "adminLogin");// check the code
        if(!codeRecord.length){
            res.status(400).json({success:false, message:"Invalid Code!"});
            return;
        }
        const expiryDate = new Date(codeRecord[0].expiryDate).getTime();// check code if expired
        if(expiryDate < Date.now()){
            res.status(400).json({success:false, message:"Code Expired!!"});
            return;
        }
        const payload = {role:"admin"} // start token gen
        const SECRET = process.env.JWT_SECRET as string;
        const token = sign(payload, SECRET,{expiresIn:"7d"})
        res.cookie("token", token, {
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge:60000 * 60 * 24 * 7, //expires in days// cookies
            path:"/administrator"
        })
        const deleteRecentCode = await deleteCodeByEmailOrigin(adminEmail, "adminLogin");
        const safeData = {
            adminEmail: validAccount[0].adminEmail,
            adminName: validAccount[0].adminName
        }
        res.status(200).json({success:true, message:"Login Success!", safeData})
    } catch (error) {
        next(error)
    }
};

export const adminTokenAuthentication = async (req: Request, res: Response): Promise<void>=> {
    try {
        const token = req.cookies.token
        if(!token){
            res.status(400).json({success:false, message:"No token"});
            return;
        }
        const verifyToken = verify(token, process.env.JWT_SECRET as string) as TokenPayload
        if(verifyToken.role !== "admin"){
            res.status(400).json({success:false, message:"Access Prohibited!"});
            return;
        }
        res.status(200).json({success:true, message:"Access Granted!"})
    } catch (error) {
        res.status(500).json({success:false, message:"Server Error!"})
    }
};