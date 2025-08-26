


import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
      


        
        console.log("Cookies received:", req.cookies); 
        console.log("JWT token:", token); 
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorised - No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded); 
        
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorised - Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");
        console.log("User found:", user ? "Yes" : "No");
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    }
    catch (err) {
        console.log("Error in protectedRoute middleware", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};