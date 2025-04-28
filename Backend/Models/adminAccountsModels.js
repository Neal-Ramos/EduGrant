const conn = require("./dbConnect")
const util = require("util")
const query = util.promisify(conn.query).bind(conn)

exports.getAdminByEmailPassword = (adminEmail, adminPassword) => {
    return query("SELECT * FROM admin_accounts WHERE BINARY adminEmail = ? AND BINARY adminPassword = ?", [adminEmail, adminPassword])
}
exports.getAdminByEmail = (adminEmail) => {
    return query("SELECT * FROM admin_accounts WHERE BINARY email = ?", [adminEmail])
}