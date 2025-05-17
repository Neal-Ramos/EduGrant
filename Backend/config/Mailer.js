const nodemailer = require("nodemailer")
const securityCodeModels = require("../Models/securityCodeModels")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAILER_EMAIL_CREDENTIAL,
        pass: process.env.MAILER_SECRET_PASS,
    },
})

exports.SendMail = (mailOptions, origin, adminEmail, sendCode, expiresAt) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions,async function (error, info) {
            if (error) {
                console.log(error)
                return resolve({success:false})
            }
            try {
                await securityCodeModels.insertCode(origin, adminEmail, sendCode, expiresAt)
                return resolve({success:true})
            } catch (err) {
                console.error("DB insert error:", err);
                return resolve({success:false})
            }
        })
    })
}