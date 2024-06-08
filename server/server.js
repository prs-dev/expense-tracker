const express = require("express")
const authRouter = require("./routes/auth.routes")
const expenseRouter = require('./routes/expense.routes')
const categoryRouter = require('./routes/category.routes')
const userRouter = require('./routes/user.routes')
require("dotenv").config()
const {dbConnect} = require("./utils/mongo")
const path = require("path")

const app = express()

app.use(express.json())

//test-endpoint
// app.get("/api/test", (req, res) => {
//     res.send("test reached")
// })

//routes

const  __dirname2 = path.resolve()
const PORT = process.env.PORT || 5000

app.use('/api/auth', authRouter)

//auth routes
app.use('/api/expense', expenseRouter)
app.use('/api/category', categoryRouter)
app.use('/api/user', userRouter)

app.use(express.static(path.join(__dirname2, "/client/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname2, "client", "dist", "index.html"))
})

dbConnect()

app.listen(PORT, () => {
    console.log("server running...")
})