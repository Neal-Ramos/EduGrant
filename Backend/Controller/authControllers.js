const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const nodemailer = require("nodemailer")
const userAccountsModels = require("../Models/userAccountsModels")
const securityCodeModels = require("../Models/securityCodeModels")
const { json } = require("stream/consumers")
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.registerAccounts = async (req, res) => {
    try {
        const {firstName, middleName, lastName, userEmail, userPassword} = req.body
        const hashedPass = await bcrypt.hash(userPassword, 10)

        if(!firstName || !lastName || !middleName || !userEmail || !userPassword){return res.status(400).json({message : "Please Fillout all Credentials!!!"})}
        if(userPassword.length < 8 || userEmail.charAt(0) === userEmail.charAt(0).toUpperCase() || !userEmail.includes("@")){return res.status(400).json({message : "Invalid Password: Must be 8 Characters Or Invalid Email"})}
        
        const checkIfExistingEmail = await userAccountsModels.getUserByEmail(userEmail)
        if (checkIfExistingEmail.length > 0) {return res.status(400).json({ message: "Email Already Exists!!" });}

        const sendCode = crypto.randomBytes(3).toString("hex");
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: "Registration Code",
            text: `Your Registration Code is ${sendCode} if this is not you ignore this email`,
            html:``
        };

        const code = await securityCodeModels.getCodeByEmailRegistration(userEmail, "registration")
        if(code.length > 0){
            const validCodeExists = code.some(element => {
                const expiryDate = new Date(element.expiryDate).getTime();
                return expiryDate > Date.now();
                });
            if (validCodeExists) {
            return res.status(200).json({ success: true, message: "Email already Sent!!" });
            }
        }//code expired sends another code
        
        transporter.sendMail(mailOptions,async function (error, info) {
            if (error) {
                return res.status(500).json({success:false, message:"Email Not Sent!!"})
            }
            try {
                await securityCodeModels.insertCode("registration", userEmail, sendCode, expiresAt)
                return res.status(200).json({ success: true, message: "Email Sent!!" });
            } catch (err) {
                console.error("DB insert error:", err);
                return res.status(500).json({ success: false, message: "Server Error" });
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false, detail:error.message
        })
    }
}
exports.loginAccounts =  async (req, res) => {
    try {
        const {userEmail, userPassword} = req.body
        if(!userEmail || !userPassword){
            return res.status(400).json({
                message : "Please Fillout all Credentials!!!"
            })
        }
        const checkEmailExist = await userAccountsModels.getUserByEmail(userEmail)
        if(checkEmailExist.length === 0){return res.status(401).json({success: false, message : "Invalid Credentials!!"})}
        try {
            const isMatch = await bcrypt.compare(userPassword, checkEmailExist[0].userPassword)
            if(!isMatch){return res.status(401).json({success: false, message : "Invalid Credentials!!!!"})}
            const sendCode = crypto.randomBytes(3).toString("hex");
            const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: userEmail,
                subject: "Login Code",
                text: `Your Login Code is ${sendCode} if this is not you ignore this email`,
                html:``
            };
            const rowCode = await securityCodeModels.selectExistingCodeByEmailOrigin(userEmail, "login")
            if(rowCode.length > 0){
                const validCodeExists = rowCode.some(element => {
                    const expiryDate = new Date(element.expiryDate).getTime();
                    return expiryDate > Date.now();
                });
                
                if (validCodeExists) {
                return res.status(200).json({ success: true, message: "Email already Sent!!" });
                }
            }//code expired sends another code
            transporter.sendMail(mailOptions,async function (error, info) {
                await securityCodeModels.insertCode("login", userEmail, sendCode, expiresAt)
                return res.status(200).json({ success: true, message: "Email Sent!!" });
            });
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        return res.status(500).json({
            success: false, detail:error.message
        })
    }
}
exports.codeAuthentication = async (req, res) => {
    const { code, origin} = req.body
    if(!code || !origin){return res.status(400).json({success:false})}
    if(origin === "login"){
        const {code, origin, userEmail, userPassword} = req.body
        if(!userEmail || !userPassword){return res.status(400).json({success:false, message:"Fillout All Credentials!!"})}
        try {
            const selectMatchCode = await securityCodeModels.selectCodeByCodeEmailOrigin(code, userEmail, origin)
            if(selectMatchCode.length > 0){
                const expiryDate = new Date(selectMatchCode[0].expiryDate).getTime();
                if(expiryDate > Date.now()){
                    const getUser = await userAccountsModels.getUserByEmail(userEmail)
                    const userID = getUser[0].userID
                    const token = jwt.sign({userID}, process.env.JWT_SECRET, {expiresIn: "2h"})//expires TOKEN
                    res.cookie("token", token, {
                        httpOnly:true,
                        secure:process.env.NODE_ENV === "production",
                        sameSite:"strict",
                        maxAge:60000 * 60 * 24 * 7, //expires in days// cookies
                        path:"/"
                    })
                    await securityCodeModels.deleteCodeByEmailOrigin(userEmail, origin)
                    const userData = getUser[0]
                    return res.status(200).json({success:true, message:"Login Success!", userData})
                }
                return res.status(403).json({success:false, message:"Expired Code!!"})
            }
            return res.status(403).json({success:false, message:"Invalid Code"})
        } catch (error) {
            return res.status(500).json({success:false, message:"server error", error})
        }
    }
    if(origin == "registration"){
        const {code,origin ,firstName , middleName, lastName, userEmail, userPassword} = req.body
        if(!firstName || !middleName || !lastName || !userEmail || !userPassword){return res.status(400).json({success:false, message:"Fill all Credentials"})}
        const checkDuplicate = await userAccountsModels.getUserByEmail(userEmail)
        if(checkDuplicate.length > 0){return res.status(400).json({success:false, message:"This Email is Already used"})}
        try {
            const selectMatchCode = await securityCodeModels.selectCodeByCodeEmailOrigin(code, userEmail, origin)
            if(selectMatchCode.length > 0){
                const expiryDate = new Date(selectMatchCode[0].expiryDate).getTime();
                if(expiryDate > Date.now()){
                    const encryptPassword = await bcrypt.hash(userPassword, 10)
                    await userAccountsModels.inserNewUser(firstName, middleName, lastName, userEmail, encryptPassword)
                    await securityCodeModels.deleteCodeByEmailOrigin(userEmail, origin)
                    return res.status(201).json({success:true, message:"Account Created!!"})
                }
                return res.status(400).json({success:false, message:"Expired Code!!"})
            }
            return res.status(400).json({success:false, message:"Invalid Code!!"})
        } catch (error) {
            return res.status(500).json({success:false, error})
        }
    }
}
exports.tokenAuthetication = async (req, res) => {
    const cookieToken = req.cookies.token
    if (!cookieToken) {return res.status(401).json({success: false, message: "No Token Provided or Invalid Format"})}
    try {
        const verifiedUser = jwt.verify(cookieToken, process.env.JWT_SECRET)
        return res.status(200).json({
            success: true
        })
    } catch (error) {
        return res.status(401).json({
            success: false, message:"Session Expired"
        })
    }
}