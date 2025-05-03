const express = require("express")
const router = express.Router()
const postController = require("../Controller/postController")

router.get("/getScholarship", postController.getScholarships)
router.post("/getScholarshipsByIdClient", postController.getScholarshipsById)

module.exports = router