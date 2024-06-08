const Expense = require("../models/expense.model")
const Category = require("../models/category.model")
const User = require("../models/user.model")

const getAllExpenses = async(req, res) => {
    //getting expenses of logged in user
    try {
        // const user = await req.user.populate(["expenses"])
        const expenses = await Expense.find({user: req?.user?._id}).populate("category")
        res.status(200).json({expenses})
    } catch (error) {
        console.log("error in get all expenses")
        return res.status(500).json({ error: error.message || 'Internal Server Error' })
    }
}

const getMonthlyExpenses = async(req, res) => {
    try {
        const curr = new Date()
        // const start = new Date(curr.getFullYear(), curr.getMonth() - 1, curr.getDate()) //get last month's date
        const start = new Date(curr.getFullYear(), curr.getMonth(), 1) //get month's first date
        const end = new Date(curr.getFullYear(), curr.getMonth() + 1, 0) //get month's first date
        const expenses = await Expense.find({user: req?.user?._id, createdAt: {
            $gte: start,
            $lt: curr
        }}).populate("category")
        console.log(start, end, expenses)
        // console.log(expenses)
        res.status(200).json(expenses)
    } catch (error) {
        console.log("error in get monthly expenses")
        return res.status(500).json({ error: error.message || 'Internal Server Error' })
    }
}

const getSingleExpense = async(req, res) => {
    
    try {
        const id = req.params.expenseId
        const expense = await Expense.findById(id)
        if(!expense) throw new Error("Invalid request")
        res.status(200).json(expense)
    } catch (error) {
        console.log("error in get all expenses")
        return res.status(500).json({ error: error.message || 'Internal Server Error' })
    }
}

const updateExpense = async(req, res) => {
    try {
        const id = req.params.expenseId
        const expense = await Expense.findByIdAndUpdate(id, req.body, {
            new: true
        })
        res.status(200).json(expense)
    } catch (error) {
        console.log("error in get all expenses")
        return res.status(500).json({ error: error.message || 'Internal Server Error' })
    }
}

const deleteExpense = async(req, res) => {
    try {
        const id = req.params.expenseId
        const expense = await Expense.findByIdAndDelete(id)
        const user = await User.findById(req?.user?._id)
        const category = await Category.findById(expense?.category)
        console.log(user, category, expense)
        user.expenses = user.expenses.filter(item => item._id.toString() !== id)
        category.expenses = category.expenses.filter(item => item._id.toString() !== id)
        await user.save()
        await category.save()
        res.status(200).json(`expense id: ${id} deleted`)
    } catch (error) {
        console.log("error in get all expenses", error)
        return res.status(500).json({ error: error.message || 'Internal Server Error' })
    }
}

const createExpense = async(req, res) => {
    try {
        console.log(req.body)
        const {amt, description, category} = req.body
        if(!amt || !description || !category) throw new Error("Please provide all the fields")
        const categoryDetails = await Category.findById(category)
        // console.log(categoryDetails)
        const user = await User.findById(req?.user?._id)
        // console.log(user)
        const expense = new Expense({
            amt, description, user: user._id, category: categoryDetails._id
        })
        await expense.save()
        user.expenses = user.expenses.concat(expense._id)
        await user.save()
        categoryDetails.expenses = categoryDetails.expenses.concat(expense._id)
        await categoryDetails.save()
        res.status(201).json({expense})
    } catch (error) {
        console.log("error in create expenses", error)
        return res.status(500).json({ error: error.message || 'Internal Server Error' })
    }
}

module.exports = {
    getAllExpenses,
    getSingleExpense,
    updateExpense,
    deleteExpense,
    createExpense,
    getMonthlyExpenses
}   