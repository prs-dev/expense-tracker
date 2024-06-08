const mongoose = require("mongoose")

const dbConnect = async() => {
    try {
        mongoose.connect(process.env.MONGO)
        console.log("db connected")
    } catch (error) {
        console.log("error in db connection", error)
    }
}

module.exports = {
    dbConnect
}