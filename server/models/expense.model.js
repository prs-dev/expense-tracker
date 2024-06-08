const mongoose = require("mongoose")

const expenseSchema = new mongoose.Schema({
    amt: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: "misc"
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Expense", expenseSchema)