const conn = require("../dbConnect")
const express = require("express")
const router = express.Router()
const util = require("util")
const jwt = require("jsonwebtoken")
const {strict} = require("assert")
const query = util.promisify(conn.query).bind(conn)

router.use((req, res, next) => {
    const cookieToken= req.cookies.token
    try {
        const authToken = jwt.verify(cookieToken, process.env.JWT_SECRET)
        next()
    } catch (error) {
        return res.status(403).json({success: false, message:"Go to login"})
    }
})

module.exports = router