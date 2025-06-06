require("dotenv").config()
const mysql = require("mysql2")
const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
})

db.connect((error) => {
    if(error){
        console.error("Database Failed to Connect!!")
        process.exit(1)
    }
    console.log("Database Connected!!!!")
})
module.exports = db