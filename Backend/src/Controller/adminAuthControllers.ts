import { Request, Response } from "express";
import { Mailer } from "../Config/mailer";
import { randomBytes } from "crypto";
import { sign, verify } from "jsonwebtoken";

import { getAdminByEmailPassword } from "../Models/adminAccountsModels";
import { deleteCodeByEmailOrigin, selectCodeByCodeEmailOrigin } from "../Models/securityCodeModels";
import { TokenPayload } from "../Types/userAuthTypes";



export const adminLogIn = async (req:Request, res: Response): Promise<void>=> {
    const {adminEmail, adminPassword} = req.body
    if(!adminEmail || !adminPassword){
        res.status(400).json({success:false, message:"Fill All Credentials"});
        return;
    }
    try {
        const correctCredenatials = await getAdminByEmailPassword(adminEmail, adminPassword)
        if(correctCredenatials.length === 0){
            res.status(400).json({success:false, message:"Invalid Credentials"});
            return;
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
        res.status(500).json({success:false, message:(error as {message: string}).message})
    }
};

export const adminCodeAuthentication = async (req: Request, res: Response): Promise<void>=> {
    const {code, origin, adminEmail} = req.body
    if(!code || !origin || !adminEmail){
        res.status(400).json({success:false, message:"Fill All Credentials"});
        return;
    }
    if(origin !== "adminLogin"){res.status(400).json({success:false, message:"Prohibited!!"});
        return
    }
    try {
        const codeRecord = await selectCodeByCodeEmailOrigin(code, adminEmail, origin);
        if(codeRecord.length === 0){
            res.status(400).json({success:false, message:"Invalid Code!"});
            return;
        }
        const expiryDate = new Date(codeRecord[0].expiryDate).getTime();
        if(expiryDate < Date.now()){
            res.status(400).json({success:false, message:"Code Expired!!"});
            return;
        }
        const payload = {role:"admin"}
        const SECRET = process.env.JWT_SECRET as string;
        const token = sign(payload, SECRET,{expiresIn:"7d"})
        res.cookie("token", token, {
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge:60000 * 60 * 24 * 7, //expires in days// cookies
            path:"/"
        })
        deleteCodeByEmailOrigin(adminEmail, origin)
        res.status(200).json({success:true, message:"Login Success!"})
    } catch (error) {
        res.status(500).json({success:false, message:(error as {message:string}).message})
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