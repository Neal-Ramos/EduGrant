const express = require("express")
const router = express.Router()
const adminAuthControllers = require("../Controller/adminAuthControllers")

router.post("/adminLogin", adminAuthControllers.adminLogIn)
router.post("/adminCodeAuthentication", adminAuthControllers.adminCodeAuthentication)
router.post("/adminTokenAuthentication", adminAuthControllers.adminTokenAuthentication)
module.exports = router