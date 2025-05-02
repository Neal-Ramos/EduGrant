const express = require("express")
const router = express.Router()
const adminPostControllers = require("../Controller/adminPostControllers")
const upload = require("../uploader/uploadRoutes")

router.post("/adminAddScholarships", upload.fields([{ name: 'sponsorLogo', maxCount: 1 },{ name: 'coverImg', maxCount: 1 }]) ,adminPostControllers.adminAddScholarships)
router.post("/getScholarshipsById", adminPostControllers.getScholarshipsById)
router.get("/getScholarships", adminPostControllers.getScholarships)

module.exports = router