const express = require("express")
const router = express.Router()
const userController = require("../Controller/userController")

router.post("/logout", userController.logoutUser);

module.exports = router