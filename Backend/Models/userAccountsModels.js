const conn = require("./dbConnect")
const util = require("util")
const query = util.promisify(conn.query).bind(conn)

exports.getUserByEmail = (userEmail) => {
    return query("SELECT * FROM user_account WHERE userEmail = ?", [userEmail])
}
exports.insertNewUser = (firstName, middleName, lastName, userEmail, encryptPassword) => {
    return query("INSERT INTO user_account(firstName, middleName, lastName, userEmail, userPassword) VALUES(?, ?, ?, ?, ?)",
        [firstName, middleName, lastName, userEmail, encryptPassword])
}
exports.getUserByID = (userId) => {
    return query("SELECT * FROM user_account WHERE userId = ?",[userId])
}