require("dotenv").config();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../model/user_db");


module.exports.signup = async (req, res) => {
  try {
    const { full_name, email, password, re_password } = req.body;
    
    // Validate required fields
    if (!full_name || !email || !password || !re_password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    // Validate password match
    if (password !== re_password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    
    // Check if user already exists
    let user = await Users.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    user = new Users(_.pick(req.body, ["full_name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    
    // Generate token
    const token = await jwt.sign(
      { id: user._id, role: user.role },
      process.env.PRIVATE_SECERET_TOKEN
    );

    // Send response
    res
      .cookie("token", token, {
        path: "/",
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200) // Move status to this line to ensure it's set correctly
      .json({ message: "User signup successfully", body: user });
      
  } catch (err) {
    console.error("Signup error:", err); // Log error details
    res.status(500).json({ message: err.message }); // Ensure a 500 status for server errors
  }
};




module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const user = await Users.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "invalid email or password" });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: "invalid email or password" });
    }
    const token = await jwt.sign(
      { id: user._id, role: user.role },
      process.env.PRIVATE_SECERET_TOKEN
    );
    res
      .cookie("token", token, {
        path: "/",
        httpOnly: true,
        // expires: new Date(Date.now()) + 1000 * 86400,
        sameSite: "none",
        secure: true,
      })
      .json({ message: "loggedin successfully", body: user })
      .status(200);
  } catch (err) {
    res.json({ message: err.message });
  }
};



module.exports.logout = async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // Setting expiration date to past
    sameSite: "none",
    secure: true,
  });
  res
    .json({
      message: "logged out successfully",
    })
    .status(200);
};



module.exports.logStatus = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ message: false });
    }
    const valid = await jwt.verify(token, process.env.PRIVATE_SECERET_TOKEN);
    if (valid) {
      return res.json({ message: true });
    } else return res.json({ message: false });
  } catch (err) {
    res.json({ message: err.message });
  }
};



module.exports.userInfo = async (req, res) => {
  try {
    const id = req.user.id;
    if (!id) {
      return res.json({ message: "not authorized" });
    }
    const user = await Users.findById(id);
    if (!user) {
      return res.json({ message: "user does not exist" });
    }
    return res.json({ message: user });
  } catch (err) {
    res.json({ message: err.message });
  }
};

