// nodemon index.js
require("dotenv").config()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:process.env.CORS_URL,
    credentials: true
}))

const authRoutes = require("./routes/authRoutes")
const postRoutes = require("./routes/postRoutes")
const userRoutes = require("./routes/userRoutes")

app.use("/EduGrant", authRoutes)
app.use("/EduGrant", postRoutes)
app.use("/EduGrant", userRoutes)

const adminRoutes = require("./routes/adminRoutes")

app.use("/AdminRoutes", adminRoutes)
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})