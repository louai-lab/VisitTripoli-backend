// authMiddleware.js
import jwt from "jsonwebtoken";
import "dotenv/config";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Missing token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = decoded;

    console.log(decoded)
    req.user = decoded;

    // next()


    // Check if the user is an admin
    if (req.user.role === "admin") {
      next(); // User is an admin, proceed to the next middleware or route
    } else {
      return res
        .status(403)
        .json({ message: "Access denied. you have no permission" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};


// this is just to check if token found to enable user to access some others function in FrontEnd
export const authenticateUser = (req, res, next) => {
  const token = req.cookies.access_token;

  if (token) {
    next(); 
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};


export const logOut = (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully Logged Out!" });
};
