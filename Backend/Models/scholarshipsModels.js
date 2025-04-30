const conn = require("./dbConnect")
const util = require("util")
const query = util.promisify(conn.query).bind(conn)

exports.insertScholarships = (newScholarName, newScholarDeadline, newScholarDescription, requirements, sponsorLogo, coverImg) => {
    return query("INSERT INTO scholarships(scholarshipName, scholarshipDealine, scholarshipLogo, scholarshipCover, scholarshipDescription, scholarshipDocuments) VALUES(?, ?, ?, ?, ?, ?)",
        [newScholarName, newScholarDeadline, sponsorLogo, coverImg, newScholarDescription, requirements])
}
exports.getScholarships = () => {
    return query("SELECT * FROM scholarships")
}
exports.getScholarshipsById = (id) => {
    return query("SELECT * FROM scholarships WHERE BINARY scholarshipId = ?", [id])
}