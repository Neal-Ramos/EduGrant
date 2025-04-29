const express = require("express")
const router = express.Router()
const adminAuthControllers = require("../Controller/adminAuthControllers")
const adminPostControllers = require("../Controller/adminPostControllers")
const upload = require("../MiddleWare/upload")

router.post("/adminLogin", adminAuthControllers.adminLogIn)
router.post("/adminCodeAuthentication", adminAuthControllers.adminCodeAuthentication)
router.post("/adminTokenAuthentication", adminAuthControllers.adminTokenAuthentication)
router.post("/adminAddScholarships",upload.fields([{ name: 'sponsorLogo', maxCount: 1 },{ name: 'coverImg', maxCount: 1 }]), adminPostControllers.adminAddScholarships)
router.get("/getScholarships", adminPostControllers.getScholarships)
module.exports = router