const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        const parse = jwt.verify(token, process.env.SECRET)
        if(!parse) throw new Error("Invalid token")
        const user = await User.findById(parse.id)
        if(!user) throw new Error("Invalid token")
        req.user = user
        // console.log(user)
        next()
    } catch (error) {
        console.log("error in auth middleware")
        return res.status(500).json({ error: error.message || 'Internal Server Error' })
    }

}

module.exports = {
    verifyToken
}