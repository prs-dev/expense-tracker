const router = require("express").Router()
const {getAllExpenses, getSingleExpense, updateExpense, deleteExpense, createExpense, getMonthlyExpenses} = require("../controllers/expense.controller")
const {verifyToken} = require("../middlewares/auth")

router.get("/all", verifyToken, getAllExpenses)
router.get("/month", verifyToken, getMonthlyExpenses)
router.get('/:expenseId', verifyToken, getSingleExpense)
router.post("/create",verifyToken, createExpense)
router.put('/update/:expenseId',verifyToken, updateExpense)
router.delete("/delete/:expenseId",verifyToken, deleteExpense)

module.exports = router