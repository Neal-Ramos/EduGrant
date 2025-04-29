const express = require("express")
const router = express.Router()
const adminAuthController = require("../Controller/adminAuthController")

router.post("/adminLogin", adminAuthController.adminLogIn)
router.post("/adminCodeAuthentication", adminAuthController.adminCodeAuthentication)
router.post("/adminTokenAuthentication", adminAuthController.adminTokenAuthentication)
module.exports = router