import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "User authentication required",
      });
    }

    // Expected:
    // Authorization: Bearer TOKEN
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: "Authentication token missing",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Store logged-in user information
    req.user = decoded;

    next();

  } catch (error) {

    console.error("Authentication error:", error.message);

    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
};