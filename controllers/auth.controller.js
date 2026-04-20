const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
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
    const error = errorHandler(500, "Error creating user but this is by error handler")
    error(err, req, res, next);
   // next(err)
  }

};

module.exports = { signup };
