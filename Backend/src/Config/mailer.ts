import nodemailer from "nodemailer";
import { insertCode } from "../Models/securityCodeModels";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAILER_EMAIL_CREDENTIAL,
        pass: process.env.MAILER_SECRET_PASS,
    },
});

export const Mailer = (mailOptions: object, origin: string, adminEmail: string, sendCode: string, expiresAt: Date): Promise<any>=> {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions,async function (error, info) {
            if (error) {
                console.log(error);
                resolve({success:false, error});
                return;
            }
            try {
                await insertCode(origin, adminEmail, sendCode, expiresAt);
                if(insertCode.length> 0){
                    return resolve({success:true});
                }
                throw new Error("Database did not Work");
            } catch (error) {
                console.error("DB insert error:", error);
                resolve({success:false, error});
                return;
            }
        });
    });
}