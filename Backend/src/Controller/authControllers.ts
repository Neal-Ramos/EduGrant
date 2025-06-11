import { json, Request, Response } from "express"
import crypto from "crypto"
import { sign, verify } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Mailer } from "../Config/mailer"
import { getUserByEmail, getUserByID, insertNewUser } from "../Models/userAccountsModels"
import { deleteCodeByEmailOrigin, getCodeByEmailRegistration, selectCodeByCodeEmailOrigin, selectExistingCodeByEmailOrigin } from "../Models/securityCodeModels"
import * as Types from "../Types/userAuthTypes";
import { error } from "console";

export const registerAccounts = async (req: Request, res: Response): Promise<void> => {
    try {
        const origin = req.body.origin;
        const { studentId, studentEmail, studentContact,
            studentFirstName, studentMiddleName, studentLastName, studentGender, studentAddress,
            studentDateofBirth, studentCourseYearSection, studentPassword, verificationCode } = JSON.parse(req.body.data) as Types.reqUserRegister;
        // console.log(studentId, studentEmail, studentContact,
        //     studentFirstName, studentMiddleName, studentLastName, studentGender, studentAddress,
        //     studentDateofBirth, studentCourseYearSection, studentPassword, verificationCode)
        if(!verificationCode || !origin || !studentId 
            || !studentEmail || !studentContact 
            || !studentPassword || !studentFirstName 
            || !studentMiddleName || !studentLastName || !studentGender 
            || !studentDateofBirth || !studentAddress || !studentCourseYearSection ){
            res.status(400).json({success: false, message:"Fill all Credentials!"});
            return;
        }
        const checkCode = await selectCodeByCodeEmailOrigin(verificationCode , studentEmail, origin)
        if(checkCode.length === 0){
            res.status(400).json({success:false, message:"Invalid Code!!"})
        }
        const expiryDate = new Date(checkCode[0].expiryDate).getTime();
        if(expiryDate < Date.now()){
            res.status(400).json({success:false, message:"Code Expired!!"});
            return;
        }
        const HashedPassword = await bcrypt.hash(studentPassword, 10)
        const newUser = await insertNewUser(studentId, studentEmail, studentContact,
            HashedPassword, studentFirstName, studentMiddleName, studentLastName, studentGender,
            studentDateofBirth, JSON.stringify(studentAddress), JSON.stringify(studentCourseYearSection));
        if(newUser === 0){
            res.status(500).json({success: false, message:"Database Error!!"});
            return;
        }
        res.status(200).json({success: true, message:"Account Created!!!"});
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
export const sendAuthCode = async (req: Request, res: Response): Promise<void>=> {
    try {
        const origin: string = req.body.origin;
        const { studentId, studentEmail, studentContact,
            studentFirstName, studentMiddleName, studentLastName, studentGender, studentAddress,
            studentDateofBirth, studentCourseYearSection, studentPassword } = JSON.parse(req.body.data) as Types.reqSendCodeRegister;
        if( !origin || !studentId 
            || !studentEmail || !studentContact 
            || !studentPassword || !studentFirstName 
            || !studentMiddleName || !studentLastName || !studentGender 
            || !studentDateofBirth || !studentAddress || !studentCourseYearSection ){
            res.status(400).json({success: false, message:"Fill all Credentials!"});
            return;
        }
        if(studentPassword.length < 8 || studentEmail.charAt(0) === studentEmail.charAt(0).toUpperCase() || !studentEmail.includes("@")){
            res.status(400).json({message : "Invalid Password: Must be 8 Characters Or Invalid Email"});
            return;
        }
        const checkIfExistingEmail = await getUserByEmail(studentEmail)
        if (checkIfExistingEmail.length > 0) {
            res.status(400).json({ message: "Email Already Exists!!" });
            return;
        }
        const sendCode = crypto.randomBytes(3).toString("hex");
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        const mailOptions = {
            from: process.env.MAILER_EMAIL_CREDENTIAL,
            to: studentEmail,
            subject: "Registration Code",
            text: `Your Registration Code is ${sendCode} if this is not you ignore this email`,
            html:``
        };
        const SendMail = await Mailer(mailOptions, origin, studentEmail, sendCode, expiresAt)
        if(SendMail.success === false){
            res.status(500).json({success:false, message:"Email Not Sent!!"});
            return;
        }
        res.status(200).json({ success: true, message: "Email Sent!!" })
    } catch (error) {
        res.status(500).json({success: false, error});
        console.log(error)
    }
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