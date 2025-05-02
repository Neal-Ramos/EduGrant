// nodemon index.js
require("dotenv").config()
const helmet = require("helmet")
const cors = require("cors")
const compression = require("compression")
const cookieParser = require("cookie-parser")
const express = require("express")
const rateLimit = require("express-rate-limit")
const app = express()
const hpp = require("hpp")
const xss = require("xss-clean")

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100, // Limit each IP to 100 requests per window
    message: 'Too many requests, please try again later.'
});

app.use(helmet())
app.use(cors({
    origin:process.env.CORS_URL_ORIGIN,
    credentials: true
}))
app.use(compression())
app.use(cookieParser())
app.use(express.json({limit:"10kb"}))
app.use(hpp())
app.use(xss())
app.use('/images', express.static("UploadImg"))
// app.use(apiLimiter)

const authRoutes = require("./routes/authRoutes")
const postRoutes = require("./routes/postRoutes")
const userRoutes = require("./routes/userRoutes")

app.use('/uploads', express.static('UploadImg'));
app.use("/EduGrant", authRoutes)
app.use("/EduGrant", postRoutes)
app.use("/EduGrant", userRoutes)


const adminAuthRoutes = require("./routes/adminAuthRoutes")
const adminPostRoutes = require("./routes/adminPostRoutes")
const adminUserRoutes = require("./routes/adminUserRoutes")

app.use("/AdminRoutes", adminAuthRoutes)
app.use("/AdminRoutes", adminPostRoutes)
app.use("/AdminRoutes", adminUserRoutes)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
      status: 'error',
      message: process.env.CORS_URL_ORIGIN === 'production' ? 'Internal Server Error' : err.message
    });
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})