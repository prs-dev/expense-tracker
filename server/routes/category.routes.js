const router = require("express").Router()
const {createCategory, getAllCategories} = require("../controllers/category.controller")
const { verifyToken } = require("../middlewares/auth")

router.get("/all", verifyToken, getAllCategories)
router.post("/create", verifyToken, createCategory)

module.exports = router