const express= require("express")
const connectDB = require("./db/db")
const dotenv = require("dotenv")

dotenv.config()
connectDB() 

const app = express()
app.use(express.json()) 

const userRouter = require("./routes/user.route")
const authRouter = require("./routes/auth.route")

app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)

app.use((err, req, res, next) => {
//   console.error(err.stack);
  res.status(500).json({ message: "Something went wrong haha!" });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000!")
})


