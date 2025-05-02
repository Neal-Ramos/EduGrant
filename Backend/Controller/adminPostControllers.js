const { v4: uuidv4 } = require('uuid');
const path = require('path');
const supabase = require('../config/supabase');//supabase

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const nodemailer = require("nodemailer")
const adminAccountsModels = require("../Models/adminAccountsModels")
const securityCodeModels = require("../Models/securityCodeModels")
const scholarshipsModels = require("../Models/scholarshipsModels")
const { json } = require("stream/consumers")
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAILER_EMAIL_CREDENTIAL,
        pass: process.env.MAILER_SECRET_PASS,
    },
});

exports.adminAddScholarships = async (req, res) => {
    const {newScholarName, newScholarDeadline, newScholarDescription, requirements} = req.body
    const sponsorLogo = req.files.sponsorLogo?.[0];
    const coverImg = req.files.coverImg?.[0];
    if(!newScholarName || !newScholarDeadline || !newScholarDescription || !requirements || !sponsorLogo || !coverImg ){return res.status(400).json({success:false, message:"Fill all Credentials!"})}
    try {
        const sponsorFileExt = path.extname(sponsorLogo.originalname);
        const sponsorFileName = `sponsor-${Date.now()}-${uuidv4()}${sponsorFileExt}`;
        const coverFileExt = path.extname(coverImg.originalname);
        const coverFileName = `cover-${Date.now()}-${uuidv4()}${coverFileExt}`;

        const { error: sponsorError } = await supabase.storage//upload the files to Supabase
        .from('scholarship-files')
        .upload(sponsorFileName, sponsorLogo.buffer, {
            contentType: sponsorLogo.mimetype,
            upsert: false,
        });
        if(sponsorError){return res.status(500).json({success:false, message:"Files Did not Upload"})}

        const { error: coverError } = await supabase.storage
        .from('scholarship-files')
        .upload(coverFileName, coverImg.buffer, {
            contentType: coverImg.mimetype,
            upsert: false,
        });
        if(coverError){return res.status(500).json({success:false, message:"Files Did not Upload"})}
        
        const { data: sponsorUrlData } = supabase.storage//get the public urls
        .from('scholarship-files')
        .getPublicUrl(sponsorFileName);

        const { data: coverUrlData } = supabase.storage//get the public urls
        .from('scholarship-files')
        .getPublicUrl(coverFileName);

        const insertScholarships = await scholarshipsModels.insertScholarships(newScholarName, newScholarDeadline, newScholarDescription, requirements, sponsorUrlData.publicUrl, coverUrlData.publicUrl)
        return res.status(200).json({success:true, message:"Scholarship Added!"})
    } catch (error) {
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