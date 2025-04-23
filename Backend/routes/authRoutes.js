const conn = require("../dbConnect")
const express = require("express")
const jwt = require("jsonwebtoken") 
const router = express.Router()
const bcrypt = require("bcryptjs")
const util = require("util")
const crypto = require("crypto")
const { strict } = require("assert")
const query = util.promisify(conn.query).bind(conn)
const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
  });
router.post("/registerAccount", async (req, res) => {// For register account
    try {
        const {firstName, middleName, lastName, userEmail, userPassword} = req.body
        const hashedPass = await bcrypt.hash(userPassword, 10)
        if(!firstName || !lastName || !middleName || !userEmail || !userPassword){return res.status(400).json({message : "Please Fillout all Credentials!!!"})}
        if(userPassword.length < 8 || userEmail.charAt(0) === userEmail.charAt(0).toUpperCase() || !userEmail.includes("@")){return res.status(400).json({message : "Invalid Password: Must be 8 Characters Or Invalid Email"})}
        const checkEmail = await new Promise((resolve, reject) => {//wait for a promise HAHAHA
            query("SELECT userEmail FROM useraccount WHERE userEmail = ?", [userEmail], (error, result) => {
                if (error) reject(error);
                resolve(result);
            });
        });
        if (checkEmail.length > 0) {
            return res.status(400).json({ message: "Email Already Exists!!" });
        }
        const sendCode = crypto.randomBytes(3).toString("hex");
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: "Registration Code",
            text: `Your Registration Code is ${sendCode} if this is not you ignore this email`,
            html:``
        };
        const row = await query("SELECT codeid, expiryDate FROM security_code WHERE receiver = ?  AND origin = ?", [userEmail, "registration"])
        if(row.length > 0){
            const validCodeExists = row.some(element => {
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
                await query("INSERT INTO security_code(origin, receiver, code, expiryDate) VALUES (?, ?, ?, ?)", ["registration", userEmail,sendCode, expiresAt]);
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
})
router.post("/codeAuthenticationRegistration", async (req, res) => {
    const {code,origin ,firstName , middleName, lastName, userEmail, userPassword} = req.body
    if(!code){return res.status().json({success:false, message:"No code provided!"})}
    const checkDuplicate = await query("SELECT userID FROM useraccount WHERE userEmail = ?", [userEmail])
    if(checkDuplicate.length > 0){return res.status(400).json({success:false, message:"This Email is Already used"})}
    try {
        const row = await query("SELECT codeId, expiryDate FROM security_code WHERE BINARY code = ? AND BINARY receiver = ? AND origin = ?", [code, userEmail, origin])
        if(row.length > 0){
            const expiryDate = new Date(row[0].expiryDate).getTime();
            if(expiryDate > Date.now()){
                const encryptPassword = await bcrypt.hash(userPassword, 10)
                await query("INSERT INTO useraccount(firstName, middleName, lastName, userEmail, userPassword) VALUES(?, ?, ?, ?, ?)",
                    [firstName, middleName, lastName, userEmail, encryptPassword])
                await query("DELETE FROM security_code WHERE receiver = ? AND origin = ?",
                    [userEmail, origin])
                return res.status(201).json({success:true, message:"Account Created!!"})
            }
            return res.status(400).json({success:false, message:"Expired Code!!"})
        }
        return res.status(400).json({success:false, message:"Invalid Code!!"})
    } catch (error) {
        return res.status(500).json({success:false, error})
    }
})
router.post("/logIn", async (req, res) => {//For login account
    try {
        const {userEmail, userPassword} = req.body
        if(!userEmail || !userPassword){
            return res.status(400).json({
                message : "Please Fillout all Credentials!!!"
            })
        }
        const checkEmailExist = await query("SELECT userID,userEmail,userPassword FROM useraccount WHERE BINARY userEmail = ?", [userEmail])
        if(checkEmailExist.length === 0){return res.status(401).json({success: false, message : "Invalid Credentials!!"})}
        try {
            const isMatch = await bcrypt.compare(userPassword, checkEmailExist[0].userPassword)
            if(!isMatch){return res.status(401).json({success: false, message : "Invalid Credentials!!!!"})}
            const sendCode = crypto.randomBytes(3).toString("hex");
            const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: userEmail,
                subject: "Registration Code",
                text: `Your Login Code is ${sendCode} if this is not you ignore this email`,
                html:``
            };
            const rowCode = await query("SELECT codeid, expiryDate FROM security_code WHERE receiver = ?  AND origin = ?", [userEmail, "login"])
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
                await query("INSERT INTO security_code(origin, receiver, code, expiryDate) VALUES (?, ?, ?, ?)", ["login", userEmail,sendCode, expiresAt]);
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
})
router.post("/codeAuthenticationLogin",async (req, res) => {
    const {code, origin, userEmail, userPassword} = req.body
    if(!code || !origin || !userEmail || !userPassword){return res.status(400).json({success:false, message:"Fillout All Credentials!!"})}
    try {
        const row = await query("SELECT codeId, expiryDate FROM security_code WHERE BINARY code = ? AND BINARY receiver = ? AND origin = ?", [code, userEmail, origin])
        if(row.length > 0){
            const expiryDate = new Date(row[0].expiryDate).getTime();
            if(expiryDate > Date.now()){
                const result = await query("SELECT * FROM useraccount WHERE BINARY userEmail = ?", [userEmail])
                const userID = result[0].userID
                const token = jwt.sign({userID}, process.env.JWT_SECRET, {expiresIn: "2h"})//expires TOKEN
                res.cookie("token", token, {
                    httpOnly:true,
                    secure:process.env.NODE_ENV === "production",
                    sameSite:"strict",
                    maxAge:60000 * 60 * 24 * 7, //expires in days// cookies
                    path:"/"
                })
                await query("DELETE FROM security_code WHERE receiver = ? AND origin = ?",
                    [userEmail, origin])
                const userData = result[0]
                return res.status(200).json({success:true, message:"Login Success!", userData})
            }
            return res.status(403).json({success:false, message:"Expired Code!!"})
        }
        return res.status(403).json({success:false, message:"Invalid Code"})
    } catch (error) {
        return res.status(500).json({success:false, message:"server error", error})
    }
})
router.post("/tokenValidation", async (req, res) => {// For validating token putangina nyo
    const cookieToken = req.cookies.token
    if (!cookieToken) {
        return res.status(401).json({success: false, message: "No Token Provided or Invalid Format"});
    }
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
})
module.exports = router