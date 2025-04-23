const conn = require("../dbConnect")
const express = require("express")
const jwt = require("jsonwebtoken") 
const router = express.Router()
const bcrypt = require("bcryptjs")
const util = require("util")
const { strict } = require("assert")
const query = util.promisify(conn.query).bind(conn)


router.post("/registerAccount", async (req, res) => {// For register account
    try {
        const {firstName, lastName, studentId, userEmail, userPassword} = req.body
        const hashedPass = await bcrypt.hash(userPassword, 10)
        if(!firstName || !lastName || !studentId || !userEmail || !userPassword){return res.status(400).json({message : "Please Fillout all Credentials!!!"})}
        if(userPassword.length < 8 || userEmail.charAt(0) === userEmail.charAt(0).toUpperCase() || !userEmail.includes("@")){return res.status(400).json({message : "Invalid Password: Must be 8 Characters Or Invalid Email"})}
        const checkEmail = await new Promise((resolve, reject) => {//wait for a promise HAHAHA
            query("SELECT userEmail FROM useraccount WHERE userEmail = ?", [userEmail], (error, result) => {
                if (error) reject(error);
                resolve(result);
            });
        });
        if (checkEmail.length > 0) {
            return res.status(400).json({ message: "Email Already Exists!!" });
        }
        const insertAccount = await new Promise((resolve, reject) => {
            query("INSERT INTO useraccount(firstName, LastName, studentID, userEmail, userPassword) VALUES(?, ?, ?, ? ,?)",
                [firstName, lastName, studentId, userEmail, hashedPass],
                (error, result) => {
                if(error){
                    reject(error)
                }
                resolve(result)
            })
        })
        return res.status(201).json({success: true,message:"Account Created!!" })//, result:insertAccount
    } catch (error) {
        return res.status(500).json({
            success: false, detail:error.message
        })
    }
})
router.post("/logIn", (req, res) => {//For login account
    try {
        const {userEmail, userPassword} = req.body
        if(!userEmail || !userPassword){
            return res.status(400).json({
                message : "Please Fillout all Credentials!!!"
            })
        }
        query("SELECT userID,userEmail,userPassword FROM useraccount WHERE BINARY userEmail = ?", [userEmail], async (error, result) => {
            if(error){
                return res.status(500).json({
                    success: false, detail:error.message
                })
            }
            if(result.length === 0){
                return res.status(401).json({
                    success: false, message : "Invalid Credentials!!!!"
                })
            }
            try {
                const isMatch = await bcrypt.compare(userPassword, result[0].userPassword)
                if(!isMatch){
                    return res.status(401).json({
                        success: false, message : "Invalid Credentials!!!!"
                    })
                }
                const userID = result[0].userID
                const role = result[0].role
                const token = jwt.sign({userID}, process.env.JWT_SECRET, {expiresIn: "2h"})//expires TOKEN
                res.cookie("token", token, {
                    httpOnly:true,
                    secure:process.env.NODE_ENV === "production",
                    sameSite:"strict",
                    maxAge:60000 * 60 * 24 * 7, //expires in days// cookies
                    path:"/"
                })
                const fetchUserdata = await query("SELECT firstName, lastName, studentID, userEmail FROM useraccount WHERE userID = ?", [userID])
                const userData = fetchUserdata[0]
                return res.status(200).json({success: true, userData})
            } catch (error) {
                return res.status(500).json({ success: false, error: error.message });
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false, detail:error.message
        })
    }
})
router.post("/tokenValidation", async (req, res) => {// For validating token putangina nyo
    const cookieToken = req.cookies.token
    if (!cookieToken) {
        return res.status(401).json({success: false, message: "No Token Provided or Invalid Format"});
    }
    try {
        const verifiedUser = jwt.verify(cookieToken, process.env.JWT_SECRET)
        return res.status(200).json({
            success: true
        })
    } catch (error) {
        return res.status(401).json({
            success: false, message:"Session Expired"
        })
    }
})
module.exports = router
//document.cookie = `token=${jwtToken}; path=/; HttpOnly; Secure; SameSite=Strict;`; Store Cookie in frontend
//axios.post('/EduGrant/logIn', 
// {
//     userEmail: 'test@example.com',
//     userPassword: 'yourpassword'
// },
// {
//     withCredentials: true,// Set withCredentials to true to send cookies
//     headers: {
//         'Content-Type': 'application/json',
//         // 'Authorization': 'Bearer your-jwt-token' optional
//     }
// }
// )
// .then(response => {
// console.log('Login Success:', response.data);
// })
// .catch(error => {
// console.log('Error:', error.response ? error.response.data : error.message);
// });