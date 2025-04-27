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