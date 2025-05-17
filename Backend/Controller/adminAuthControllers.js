const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const adminAccountsModels = require("../Models/adminAccountsModels")
const securityCodeModels = require("../Models/securityCodeModels")
const { json } = require("stream/consumers")
const Mailer = require("../config/Mailer")
const { resolve } = require("path")
const { rejects } = require("assert")
exports.adminLogIn = async (req, res) => {
    const {adminEmail, adminPassword} = req.body
    if(!adminEmail || !adminPassword){return res.status(400).json({success:false, message:"Fill All Credentials"})}
    try {
        const correctCredenatials = await adminAccountsModels.getAdminByEmailPassword(adminEmail, adminPassword)
        if(correctCredenatials.length === 0){return res.status(400).json({success:false, message:"Invalid Credentials"})}
        const sendCode = crypto.randomBytes(3).toString("hex");
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        const mailOptions = {
            from:process.env.MAILER_EMAIL_CREDENTIAL,
            to:process.env.TRUSTED_EMAIL_USER,
            subject:"Admin Login Code",
            text:`Your Admin Login code is ${sendCode} if this is not you please ignore this email!!`,
            html:""
        }
        const sendMail = await Mailer.SendMail(mailOptions, "adminLogin", adminEmail, sendCode, expiresAt)
        if(sendMail.success === false){return res.status(500).json({success:false, message:"Email Not Sent!!", error:error.message})}
        return res.status(200).json({ success: true, message: "Email Sent!!" });
    } catch (error) {
        return res.status(500).json({success:false, message:error.message})
    }
}
exports.adminCodeAuthentication = async (req, res) => {
    const {code, origin, adminEmail} = req.body
    if(!code || !origin || !adminEmail){return res.status(400).json({success:false, message:"Fill All Credentials"})}
    if(origin !== "adminLogin"){return res.status(400).json({success:false, message:"Prohibited!!"})}
    try {
        const codeRecord = await securityCodeModels.selectCodeByCodeEmailOrigin(code, adminEmail, origin);
        if(codeRecord.length === 0){return res.status(400).json({success:false, message:"Invalid Code!"})}
        const expiryDate = new Date(codeRecord[0].expiryDate).getTime();
        if(expiryDate < Date.now()){return res.status(400).json({success:false, message:"Code Expired!!"})}
        const payload = {role:"admin"}
        const token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:"7d"})
        res.cookie("token", token, {
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge:60000 * 60 * 24 * 7, //expires in days// cookies
            path:"/"
        })
        securityCodeModels.deleteCodeByEmailOrigin(adminEmail, origin)
        return res.status(200).json({success:true, message:"Login Success!"})
    } catch (error) {
        return res.status(500).json({success:false, message:error.message})
    }
}
exports.adminTokenAuthentication = async (req, res) => {
    try {
        const token = req.cookies.token
        if(!token){return res.status(400).json({success:false, message:"No token"})}
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        if(verifyToken.role !== "admin"){return res.status(400).json({success:false, message:"Access Prohibited!"})}
        return res.status(200).json({success:true, message:"Access Granted!"})
    } catch (error) {
        return res.status(500).json({success:false, message:"Server Error!"})
    }
}