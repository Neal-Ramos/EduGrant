import { NextFunction, Request, Response } from "express"
import crypto from "crypto"
import { sign, verify } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Mailer } from "../Config/mailer"
import { getUserByEmail, getUserByID, getUserByStudentId, insertNewUser } from "../Models/userAccountsModels"
import { deleteCodeByEmailOrigin, getCodeByEmailRegistration, selectCodeByCodeEmailOrigin, selectExistingCodeByEmailOrigin } from "../Models/securityCodeModels"
import * as Types from "../Types/userAuthTypes";
import { error } from "console";
import { UserAccountData } from "../Types/ModelsTypes";
import { OkPacket } from "mysql2";

export const registerAccounts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const origin = "register";
        const { studentId, studentEmail, studentContact,
            studentFirstName, studentMiddleName, studentLastName, studentGender, studentAddress,
            studentDateofBirth, studentCourseYearSection, studentPassword, verificationCode } = JSON.parse(req.body.data) as Types.reqUserRegister;
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
            res.status(400).json({success:false, message:"Invalid Code!!"});
            return;
        }
        const expiryDate = new Date(checkCode[0].expiryDate).getTime();
        if(expiryDate < Date.now()){
            res.status(400).json({success:false, message:"Code Expired!!"});
            return;
        }
        const HashedPassword = await bcrypt.hash(studentPassword, 10)
        const newUser = await insertNewUser(studentId, studentEmail, studentContact,
            HashedPassword, studentFirstName, studentMiddleName, studentLastName, studentGender,
            studentDateofBirth, studentAddress, studentCourseYearSection);
        if(newUser === 0){
            res.status(500).json({success: false, message:"Database Error!!"});
            return;
        }
        deleteCodeByEmailOrigin(studentEmail, origin)
        res.status(200).json({success: true, message:"Account Created!!!"});
    } catch (error) {
        next(error);
    }
}
export const loginAccounts = async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
    try {
        const origin: string = "login";
        const {studentId, userPassword, code} = req.body as Types.LoginAccounts
        if(!studentId || !userPassword || !code){
            res.status(400).json({success: false, message: "Fill all Credentials!"});
            return;
        }
        const user = await getUserByStudentId(studentId);
        const checkCode = await selectCodeByCodeEmailOrigin(code, user[0].studentEmail, origin)
        if(checkCode.length === 0){
            res.status(401).json({success: false, message: "Invalid Code!!"});
            return;
        }
        const expiryDate = new Date(checkCode[0].expiryDate).getTime();
        if(expiryDate < Date.now()){
            res.status(401).json({success: false, message: "Code Expired!"});
            return;
        }
        const isMatch = await bcrypt.compare(userPassword, user[0].userPassword);
        if(!isMatch){
            res.status(500).json({success: false, message: "Wrong Password!!"});
        }
        const deleteCode = await deleteCodeByEmailOrigin(user[0].studentEmail, origin);
        if(deleteCode === 0){
            res.status(500).json({success: false, message: "Server Errror"})
            return;
        }
        const payload = {role: "user", studentId: user[0].userId};
        const token = sign(payload, (process.env.JWT_SECRET as any), {expiresIn: "7d"})
        res.cookie("token", token, {
            httpOnly: true,
            secure:process.env.NODE_ENV === "production",
            maxAge: 60000 * 60 * 24 * 7,
            sameSite: "strict",
            path:"/"
        });
        const safeData = {
            contactNumber: user[0].contactNumber,
            firstName: user[0].firstName,
            middleName: user[0].middleName,
            lastName: user[0].lastName,
            gender: user[0].gender,
            dateOfBirth: user[0].dateOfBirth,
            address: user[0].address,
            studentCourseYearSection: user[0].studentCourseYearSection,
            studentEmail: user[0].studentEmail,
            studentId: user[0].studentId
        }

        res.status(200).json({success: true, userData: safeData})
    } catch (error) {
        next(error);
    }
}
export const sendAuthCodeRegister = async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
    try {
        const origin: string = "register";
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
        next(error);
    }
}
export const sendAuthCodeLogin = async(req: Request, res: Response, next: NextFunction): Promise<void>=> {
    try {
        const origin: string = "login";
        const {studentId, userPassword} = req.body as Types.reqSendCodeLogin
        if(!studentId || !userPassword){
            res.status(400).json({success: false, message:"Fill all Credentials!!"});
            return;
        };
        const checkUserExist = await getUserByStudentId(studentId);
        if(checkUserExist.length === 0){
            res.status(401).json({success: false, message: "Invalid Student ID/Password!"});
            return;
        }
        const isMatch = await bcrypt.compare(userPassword, checkUserExist[0].userPassword);
        if(!isMatch){
            res.status(401).json({success: false, message:"Invalid Student ID/Password!"});
            return;
        }
        const sendCode = crypto.randomBytes(3).toString("hex");
        const expiresAt = new Date(Date.now() + 2 * 60 * 1000)
        const mailOptions = {
            from:process.env.MAILER_EMAIL_CREDENTIAL,
            to:checkUserExist[0].studentEmail,
            subject:"Login Code",
            text:`Your Login Code is ${sendCode} if this isn't you Ignore this Email!!`,
            html:""
        }
        const checkExistingCode = await selectExistingCodeByEmailOrigin(checkUserExist[0].studentEmail, origin);
        if(checkExistingCode.length > 0){
            const expiryDate = new Date(checkExistingCode[0].expiryDate).getTime();
            if(expiryDate > Date.now()){
                res.status(200).json({success: true, message:"Code Already Sent!!"});
                return;
            }
        }
        const SendCode = await Mailer(mailOptions, origin, checkUserExist[0].studentEmail, sendCode, expiresAt)
        if(SendCode.success === false){
            res.status(500).json({success:false, message:"Server Error"})
        }
        res.status(200).json({success: true, message:"Code Send!!"});
    } catch (error) {
        console.log(error)
        next(error);
    }
}
export const tokenAuthetication = async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
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
        next(error);
    }
}