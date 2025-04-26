const conn = require("./dbConnect")
const util = require("util")
const query = util.promisify(conn.query).bind(conn)

exports.getCodeByEmailRegistration = (userEmail, origin) => {
    return query("SELECT codeid, expiryDate FROM security_code WHERE receiver = ?  AND origin = ?", [userEmail, origin])
}
exports.selectExistingCodeByEmailOrigin = (userEmail, origin) => {
    return query("SELECT codeid, expiryDate FROM security_code WHERE receiver = ?  AND origin = ?", [userEmail, origin])
}
exports.selectCodeByCodeEmailOrigin = (code, userEmail, origin) => {
    return query("SELECT codeId, expiryDate FROM security_code WHERE BINARY code = ? AND BINARY receiver = ? AND origin = ?", [code, userEmail, origin])
}
exports.deleteCodeByEmailOrigin = (userEmail, origin) => {
    query("DELETE FROM security_code WHERE receiver = ? AND origin = ?",
        [userEmail, origin])
}
exports.insertCode = (origin, userEmail, sendCode, expiresAt) => {
    return query("INSERT INTO security_code(origin, receiver, code, expiryDate) VALUES (?, ?, ?, ?)", [origin, userEmail,sendCode, expiresAt])
}