const express = require("express")
const router = express.Router()
const adminPostControllers = require("../Controller/adminPostControllers")
const upload = require("../MiddleWare/upload")

router.post("/adminAddScholarships", adminPostControllers.adminAddScholarships)
router.post("/getScholarshipsById", adminPostControllers.getScholarshipsById)
router.get("/getScholarships", adminPostControllers.getScholarships)

module.exports = router