// const Expense = require("../models/expense.model")
const Category = require("../models/category.model")
const User = require("../models/user.model")

const getAllCategories = async(req, res) => {
    try {
        // const user = await User.findById(req?.user?._id).populate("categories")
        const categories = await Category.find({user: req?.user?._id}).populate("expenses")
        res.status(200).json({categories})
    } catch (error) {
        console.log("error in get all category")
        return res.status(500).json({ error: error.message || 'Internal Server Error' })
    }
}

const createCategory = async (req, res) => {
    try {
        const { name } = req.body
        if(!name) throw new Error("please provide all fields!")
        const user = await User.findById(req?.user?._id)
        const category = new Category({
            name,
            user: req.user?._id
        })
        await category.save()
        user.categories = user.categories.concat(category._id)
        await user.save()
        res.status(201).json({category})
    } catch (error) {
        console.log("error in create category")
        return res.status(500).json({ error: error.message || 'Internal Server Error' })
    }
}

module.exports = {
    getAllCategories,
    createCategory
}   