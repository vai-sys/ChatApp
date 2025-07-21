import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectedRoute=async(req,res,next)=>{

try{
const token=req.cookies.jwt;
if(!token){
    return res.status(401).json({message:"Unathorised -No Token Provided"});

}
const decoded=jwt.verify(token,process.env.JWT_SECRET);
if(!decoded){
    return res.status(401).json({message:"Unauthorised -Invalid Token"});
}

const user=await User.findById(decoded.userId).select("-password");
if(!user){
    return res.status(404).json({message:"User not found"})
}

req.user=user;
next();


}
catch(err){
    console.log("Error in protectedRoute middleware",err.message);
    res.status(500).json({message:"Internal server error"})

}
};