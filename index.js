const express= require("express")
const connectDB = require("./db/db")
const dotenv = require("dotenv")

dotenv.config()
connectDB() 

const app = express()

app.listen(3000, () => {
    console.log("Server is running on port 3000!")
})


