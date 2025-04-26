const express = require("express")
const router = express.Router()
const authController = require("../Controller/authControllers")

router.post("/registerAccount", authController.registerAccounts)
router.post("/logIn", authController.loginAccounts)
router.post("/codeAuthentication", authController.codeAuthentication)
router.post("/tokenValidation", authController.tokenAuthetication)

module.exports = router