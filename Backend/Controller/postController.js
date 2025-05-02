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
        user: process.env.MAILER_EMAIL_CREDENTIAL,
        pass: process.env.MAILER_SECRET_PASS,
    },
});

exports.getScholarships = async (req, res) => {
    try {
        const getAllScholarships = await scholarshipsModels.getScholarships()
        res.status(200).json(getAllScholarships)
    } catch (error) {
        return res.status(500).json({success:false, message:"Internal Server Error!!!", error:error.message})
    }
}