const express = require("express")
const router = express.Router()
const adminUserControllers = require("../Controller/adminUserControllers")

router.post("/adminLogout", adminUserControllers.adminLogout)

module.exports = router