const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const nodemailer = require("nodemailer")
const adminAccountsModels = require("../Models/adminAccountsModels")
const securityCodeModels = require("../Models/securityCodeModels")
const { json } = require("stream/consumers")
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAILER_EMAIL_CREDENTIAL,
        pass: process.env.MAILER_SECRET_PASS,
    },
});

exports.adminLogIn = async (req, res) => {
    const {adminEmail, adminPassword} = req.body
    if(!adminEmail || !adminPassword){return res.status(400).json({success:false, message:"Fill All Credentials"})}
    try {
        const correctCredenatials = await adminAccountsModels.getAdminByEmailPassword(adminEmail, adminPassword)
        if(correctCredenatials.length === 0){return res.status(400).json({success:false, message:"Invalid Credentials"})}
        
    } catch (error) {
        return res.status(500).json({success:false, message:error})
    }
}
exports.adminCodeAuthentication = async (req, res) => {
    const {code, origin, adminEmail, adminPassword} = req.body
    if(!code || !origin || !adminEmail || !adminPassword){return res.status(400).json({success:false, message:"Fill All Credentials"})}
    if(origin !== "admin")
    try {
        const payload = {adminId:adminId, role:"admin"}
        const emailExist = await adminAccountsModels.getAdminByEmail(adminEmail)
        if(emailExist.length === 0){return res.status(400).json({success:false, message:"Invalid Credentials"})}
    } catch (error) {
        return res.status(500).json({success:false, message:error})
    }
}
exports.adminTokenAuthentication = async (req, res) => {

}