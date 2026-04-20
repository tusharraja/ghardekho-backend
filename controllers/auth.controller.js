const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../utils/error.js");



const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try{
     await newUser.save();
  res.status(201).json({ message: "User created successfully!" });

  }
  catch(err){
    // res.status(500).json({ message: "Error creating user", error: err.message });
    return errorHandler(500, "Error creating user but this is by error handler")(err, req, res, next);
  }

};

const signin = async (req, res, next) => {  
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET || "secretkey",
          { expiresIn: "1d" }
        );

        res.cookie("access_token", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });

        const { password: _, ...userWithoutPassword } = user._doc;
        res.status(200).json({
          message: "Signin successful!",
          token,
          user: userWithoutPassword,
        });
    }
    catch(err){
        return errorHandler(500, "Error signing in but this is by error handler")(err, req, res, next);
    }
};  

module.exports = { signup, signin };    
