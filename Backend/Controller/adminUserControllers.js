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

exports.adminLogout = (req, res) => {
    try {
        res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "strict" });
        return res.status(200).json({ success: true, message: "Logged out successfully!" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Logged out Failed!" });
    }
}