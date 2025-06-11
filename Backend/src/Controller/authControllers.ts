import { Request, Response } from "express"
import crypto from "crypto"
import { sign, verify } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Mailer } from "../Config/mailer"
import { getUserByEmail, getUserByID, insertNewUser } from "../Models/userAccountsModels"
import { deleteCodeByEmailOrigin, getCodeByEmailRegistration, selectCodeByCodeEmailOrigin, selectExistingCodeByEmailOrigin } from "../Models/securityCodeModels"
import * as Types from "../Types/userAuthTypes";

export const registerAccounts = async (req: Request, res: Response): Promise<void> => {
    try {
        const {firstName, middleName, lastName, userEmail, userPassword} = req.body

        if(!firstName || !lastName || !middleName || !userEmail || !userPassword){
            res.status(400).json({message : "Please Fillout all Credentials!!!"});
            return;
        }
        if(userPassword.length < 8 || userEmail.charAt(0) === userEmail.charAt(0).toUpperCase() || !userEmail.includes("@")){
            res.status(400).json({message : "Invalid Password: Must be 8 Characters Or Invalid Email"});
            return;
        }
        
        const checkIfExistingEmail = await getUserByEmail(userEmail)
        if (checkIfExistingEmail.length > 0) {
            res.status(400).json({ message: "Email Already Exists!!" });
            return;
        }

        const sendCode = crypto.randomBytes(3).toString("hex");
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        const mailOptions = {
            from: process.env.MAILER_EMAIL_CREDENTIAL,
            to: userEmail,
            subject: "Registration Code",
            text: `Your Registration Code is ${sendCode} if this is not you ignore this email`,
            html:``
        };
        const code = await getCodeByEmailRegistration(userEmail, "registration")
        if(code.length > 0){
            const validCodeExists = code.some(element => {
                const expiryDate = new Date(element.expiryDate).getTime();
                return expiryDate > Date.now();
                });
            if (validCodeExists) {
                res.status(200).json({ success: true, message: "Email already Sent!!" });
                return;
            }
        }
        const SendMail = await Mailer(mailOptions, "registration", userEmail, sendCode, expiresAt)
        if(SendMail.success === false){
            res.status(500).json({success:false, message:"Email Not Sent!!"});
            return;
        }
        res.status(200).json({ success: true, message: "Email Sent!!" })
    } catch (error) {
        res.status(500).json({
            success: false, detail:(error as {message: string}).message
        })
    }
}
export const loginAccounts = async (req: Request, res: Response): Promise<void>=> {
    try {
        const {userEmail, userPassword} = req.body as Types.LoginAccounts
        if(!userEmail || !userPassword){
            res.status(400).json({message : "Please Fillout all Credentials!!!"});
            return;
        }
        const checkEmailExist = await getUserByEmail(userEmail)
        if(checkEmailExist.length === 0){
            res.status(401).json({success: false, message : "Invalid Credentials!!"});
            return;
        }
        try {
            const isMatch = await bcrypt.compare(userPassword, checkEmailExist[0].userPassword)
            if(!isMatch){
                res.status(401).json({success: false, message : "Invalid Credentials!!!!"});
                return;
            }
            const sendCode = crypto.randomBytes(3).toString("hex");
            const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
            const mailOptions = {
                from: process.env.MAILER_EMAIL_CREDENTIAL,
                to: userEmail,
                subject: "Login Code",
                text: `Your Login Code is ${sendCode} if this is not you ignore this email`,
                html:``
            };
            const rowCode = await selectExistingCodeByEmailOrigin(userEmail, "login")
            if(rowCode.length > 0){
                const validCodeExists = rowCode.some(element => {
                    const expiryDate = new Date(element.expiryDate).getTime();
                    return expiryDate > Date.now();
                });
                if (validCodeExists) {
                    res.status(200).json({ success: true, message: "Email already Sent!!" });
                    return;
                }
            }//code expired sends another code
            const SendMail = await Mailer(mailOptions, "login", userEmail, sendCode, expiresAt);
            if(SendMail.success === false){
                res.status(500).json({success:false, message:"Email Not Sent!!"});
                return;
            }
            res.status(200).json({ success: true, message: "Email Sent!!" })
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        res.status(500).json({
            success: false, detail:(error as {message: string}).message
        });
    }
}
export const codeAuthentication = async (req: Request, res: Response): Promise<void>=> {
    const { code, origin} = req.body as Types.CodeOrigin;
    if(!code || !origin){
        res.status(400).json({success:false, message:"Enter A Valid Code!!"});
        return;
    }
    if(origin === "login"){
        const {code, origin, userEmail, userPassword} = req.body as Types.LoginCodeAuth;
        if(!userEmail || !userPassword){
            res.status(400).json({success:false, message:"Fillout All Credentials!!"});
            return;
        }
        try {
            const selectMatchCode = await selectCodeByCodeEmailOrigin(code, userEmail, origin)
            if(selectMatchCode.length > 0){
                const expiryDate = new Date(selectMatchCode[0].expiryDate).getTime();
                if(expiryDate < Date.now()){
                    res.status(403).json({success:false, message:"Expired Code!!"});
                    return;
                }
                const getUser = await getUserByEmail(userEmail)
                const userID = getUser[0].userID
                const secret = process.env.JWT_SECRET as string;
                const token = sign({userID}, secret, {expiresIn: "7d"})//expires TOKEN
                res.cookie("token", token, {
                    httpOnly:true,
                    secure:process.env.NODE_ENV === "production",
                    sameSite:"strict",
                    maxAge:60000 * 60 * 24 * 7, //expires in days// cookies
                    path:"/"
                })
                const deleteCode = await deleteCodeByEmailOrigin(userEmail, origin)
                const userData = getUser[0]
                res.status(200).json({success:true, message:"Login Success!", userData})
                return;
            }
            res.status(403).json({success:false, message:"Invalid Code"});
            return;
        } catch (error) {
            res.status(500).json({success:false, message:"server error", error})
            return;
        }
    }
    if(origin == "registration"){
        const {code,origin ,firstName , middleName, lastName, userEmail, userPassword} = req.body as Types.RegisterCodeAuth;
        if(!firstName || !middleName || !lastName || !userEmail || !userPassword){
            res.status(400).json({success:false, message:"Fill all Credentials"});
            return;
        }
        const checkDuplicate = await getUserByEmail(userEmail)
        if(checkDuplicate.length > 0){
            res.status(400).json({success:false, message:"This Email is Already used"});
            return;
        }
        try {
            const selectMatchCode = await selectCodeByCodeEmailOrigin(code, userEmail, origin)
            if(selectMatchCode.length > 0){
                const expiryDate = new Date(selectMatchCode[0].expiryDate).getTime();
                if(expiryDate > Date.now()){
                    const encryptPassword = await bcrypt.hash(userPassword, 10)
                    await insertNewUser(firstName, middleName, lastName, userEmail, encryptPassword)
                    await deleteCodeByEmailOrigin(userEmail, origin)
                    res.status(201).json({success:true, message:"Account Created!!"});
                    return;
                }
                res.status(400).json({success:false, message:"Expired Code!!"});
                return;
            }
            res.status(400).json({success:false, message:"Invalid Code!!"});
            return;
        } catch (error) {
            res.status(500).json({success:false, error});
            return;
        }
    }
    res.status(400).json({success:false, message:"Invalid Code Origin"});
}
export const tokenAuthetication = async (req: Request, res: Response): Promise<void>=> {
    const cookieToken = req.cookies.token
    if (!cookieToken) {
        res.status(401).json({success: false, message: "No Token Provided or Invalid Format"});
        return;
    }
    try {
        const SECRET = process.env.JWT_SECRET as string
        const verifiedUser = verify(cookieToken, SECRET) as Types.TokenPayload
        if(verifiedUser.role === "admin"){
            res.status(401).json({success:false, message:"Token Prohibited!!!"});
            return;
        }
        const userData = await getUserByID(verifiedUser.userID)
        res.status(200).json({success: true, userData})
    } catch (error) {
        res.status(401).json({
            success: false, message:"Session Expired"
        })
    }
}