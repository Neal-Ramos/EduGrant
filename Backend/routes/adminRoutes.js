const express = require("express")
const router = express.Router()
const adminController = require("../Controller/adminController")

router.post("/adminLogin", adminController.adminLogIn)
router.post("/adminCodeAuthentication", adminController.adminCodeAuthentication)
module.exports = router 