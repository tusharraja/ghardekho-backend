const express= require("express")
const connectDB = require("./db/db")
const dotenv = require("dotenv")

dotenv.config()
connectDB() 

const app = express()


const userRouter = require("./routes/user.route")

app.use("/api/users", userRouter)

app.listen(3000, () => {
    console.log("Server is running on port 3000!")
})


