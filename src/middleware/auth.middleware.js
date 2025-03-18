const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

// Authenticate user middleware
exports.authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token, authorization denied",
      })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Find user by ID
    const user = await User.findById(decoded.id).select("-password")

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      })
    }

    // Add user to request object
    req.user = user
    next()
  } catch (error) {
    console.error("Authentication error:", error)
    res.status(401).json({
      success: false,
      message: "Token is not valid",
    })
  }
}

// Authorize roles middleware
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role ${req.user.role} is not authorized to access this resource`,
      })
    }
    next()
  }
}

