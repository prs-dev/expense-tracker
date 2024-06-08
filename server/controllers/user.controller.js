const User = require("../models/user.model")

module.exports = {
    getCurrentUserInfo: async(req, res) => {
        try {
            const user = await User.findById(req?.user?._id)
            await user.populate(['expenses', 'categories'])
            res.status(200).json(user)
        } catch (error) {
            console.log("error in get current user info")
            res.status(500).json({error})
        }
    }
    
}
