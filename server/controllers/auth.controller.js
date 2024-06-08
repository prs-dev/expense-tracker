const User = require("../models/user.model")
const Category = require("../models/category.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const registerUser = async(req, res) => {
    try {
        const {name, email, password} = req.body
        
        if(!name || !email || !password) throw new Error("Please provide all the fields!")

        const userExists = await User.findOne({email})

        if(userExists) throw new Error("user already exists")

        const salt = await bcrypt.genSalt(12)

        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({
            name, email, password: hashedPassword
        })
        
        const foodCategory = new Category({
            name: "Food",
            user: user._id
        })

        const transportationCategory = new Category({
            name: "transportation",
            user: user._id
        })

        const utilCategory = new Category({
            name: "Utilities",
            user: user._id
        })

        await foodCategory.save()
        await transportationCategory.save()
        await utilCategory.save()

        user.categories = user.categories.concat(foodCategory._id, transportationCategory._id, utilCategory._id)

        await user.save()

        const {password: newPassword, ...rest} = user._doc

        res.status(200).json({user: rest})
    } catch (error) {
        console.log("Error in register user")
        res.status(500).json({error: error.message || "Internal server error"})
    }
}

const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body
        
        if(!email || !password) throw new Error("Please provide all the fields!")

        const user = await User.findOne({email})

        if(!user) throw new Error("user does not exists")

        const compare = await bcrypt.compare(password, user.password)

        if(!compare) throw new Error("Invalid credentials!")

        const token = jwt.sign({id: user._id}, process.env.SECRET, {
            expiresIn: "7d"
        })

        const {password: newPassword, ...rest} = user._doc

        res.status(200).json({user: rest, token})
    } catch (error) {
        console.log("Error in login user")
        res.status(500).json({error: error.message || "Internal server error"})
    }
}

module.exports = {
    registerUser,
    loginUser
}