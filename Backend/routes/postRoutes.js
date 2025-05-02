const express = require("express")
const router = express.Router()
const postController = require("../Controller/postController")

router.get("/getScholarship", postController.getScholarships)

module.exports = router