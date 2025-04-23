const nodemailer = require("nodemailer")
const conn = require("../dbConnect")
const crypto = require("crypto")
const express = require("express")
const util = require("util")
const query = util.promisify(conn.query).bind(conn)
const jwt = require("jsonwebtoken")
const {strict} = require("assert")
const router = express.Router()
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
  });
router.post("/Admin_Login", async (req, res) => {
    try {
        const {username, password, code} = req.body
        if(!username.trim() || !password.trim() || !code.trim()){return res.status(400).json({success:false, message:"Fill All Credentials!!!"})}
        if(username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD){return res.status(403).json({success:false, message:"Wrong Credentials"})}
        const rows = await query("SELECT codeId, expiryDate FROM security_code WHERE code = ?", [code])
        if(rows.length === 0){return res.status(403).json({success:false, message:"Wrong Credentials!"})}
        const expiryDate = new Date(rows[0].expiryDate).getTime();
        if(expiryDate < Date.now()){return res.status(403).json({success:false, message:"Code Expired!"})}
        const token = jwt.sign({}, process.env.JWT_SECRET, {expiresIn: "2h"})
        res.cookie("token", token, {
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge:60000 * 60 * 24 * 7,  //expires in hrs// cookies
            path:"/"
        })
        return res.status(200).json({success: true, message:"Login Success!"})
    } catch (error) {
        return res.status(500).json({success: false, message:"may error", error})
    }
})
router.post("/Send_Code_Admin", (req, res) => {// send email
    try {
        const {username, password, code} = req.body
        if(!username.trim() || !password.trim()){return res.status(403).json({message:"Fill All Credentials!!!"})}
        if(username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD){return res.status(403).json({message:"Wrong Username/Password!"})}
        const sendCode = crypto.randomBytes(6).toString("hex");
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);// 5 mins
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "nealramos72@gmail.com",
            subject: "Hello from Nodemailer",
            text: `Your Secret Code is ${sendCode}`,
            html:``
        };
        transporter.sendMail(mailOptions,async function (error, info) {
            if (error) {
                return res.status(500).json({success:false, message:"Email Not Sent!!"})
            }
            try {
                await query("INSERT INTO security_code(code, expiryDate) VALUES (?, ?)", [sendCode, expiresAt]);
                return res.status(200).json({ success: true, message: "Email Sent!!" });
            } catch (err) {
                console.error("DB insert error:", err);
                return res.status(500).json({ success: false, message: "Server Error" });
            }
        });
    } catch (error) {
        console.log(error)
        return res.json({error})
    }
})
router.post("/Admin_Log_Out",(req, res) => {
    try {
        res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "strict" });
        return res.status(200).json({ success: true, message: "Logged out successfully!" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error!" });
    }
    
})
router.post("/Check_Token",(req, res) => {
    const token = req.cookies.token
    if(!token){return res.status(401).end();}
    try {
        const validToken = jwt.verify(token, process.env.JWT_SECRET)
        return res.status(200).json({success:true, message:"Token Still Valid!!"})
    } catch (error) {
        return res.status(401).json({success:false, message:"Token Expired!"})
    }
})
module.exports = router 