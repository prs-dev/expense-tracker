const router = require("express").Router()
const { getCurrentUserInfo } = require("../controllers/user.controller")
const { verifyToken } = require("../middlewares/auth")

router.get("/", verifyToken, getCurrentUserInfo)

module.exports = router