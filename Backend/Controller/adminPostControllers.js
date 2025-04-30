const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const nodemailer = require("nodemailer")
const adminAccountsModels = require("../Models/adminAccountsModels")
const securityCodeModels = require("../Models/securityCodeModels")
const scholarshipsModels = require("../Models/scholarshipsModels")
const { json } = require("stream/consumers")
const fs = require('fs');
const path = require('path');
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAILER_EMAIL_CREDENTIAL,
        pass: process.env.MAILER_SECRET_PASS,
    },
});

exports.adminAddScholarships = async (req, res) => {
    const {newScholarName, newScholarDeadline, newScholarDescription, requirements} = req.body
    const sponsorLogo = req.files.sponsorLogo?.[0]?.filename || null;
    const coverImg = req.files.coverImg?.[0]?.filename || null;
    if(!newScholarName || !newScholarDeadline || !newScholarDescription || !requirements || !sponsorLogo || !coverImg ){return res.status(400).json({success:false, message:"Fill all Credentials!"})}
    try {
        const insertScholarships = await scholarshipsModels.insertScholarships(newScholarName, newScholarDeadline, newScholarDescription, requirements, sponsorLogo, coverImg)
        return res.status(200).json({success:true, message:"Scholarship Added!"})
    } catch (error) {
        fs.unlink(path.join(__dirname, '../UploadImg', sponsorLogo), () => {})
        fs.unlink(path.join(__dirname, '../UploadImg', coverImg), () => {})
        return res.status(500).json({success:false, message:"Scholarship Not Added!", error:error.message})
    }
}
exports.getScholarships = async (req, res) => {
    try {
        const getAllScholarships = await scholarshipsModels.getScholarships()
        res.status(200).json(getAllScholarships)
    } catch (error) {
        return res.status(500).json({success:false, message:"Internal Server Error!!!", error:error.message})
    }
}
exports.getScholarshipsById = async (req, res) => {
    const {scholarshipId} = req.body
    if(!scholarshipId){return res.status(400).json({success:false, message:"No Id"})}
    try {
        const getScholarshipsById = await scholarshipsModels.getScholarshipsById(scholarshipId)
        return res.status(200).json({success:true, message:"Get Success!", getScholarshipsById})
    } catch (error) {
        return res.status(500).json({success:false, message:"Server Error"})
    }
}