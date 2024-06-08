const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name: {
        type: String
    },
    expenses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Expense"
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Category", categorySchema)