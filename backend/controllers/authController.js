



import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../config/utils.js";
import jwt from "jsonwebtoken"
import cloudinary from "../config/cloudinary.js"

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "email already exists" });
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword
        })

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
        }
        else {
            res.status(400).json({ message: "Invalid user data" });
        }
    }
    catch (err) {
        console.log('Error in signup controller', err.message);
        res.status(500).json({ message: "Internal Server error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });

    } catch (err) {
        console.error("Error in login controller", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (err) {
        console.log("Error in logout controller", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const UpdateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;
        
        console.log("UserId:", userId)
        
        if (!profilePic) {
            return res.status(400).json({ message: "profile pic is required!" });
        }

        const uploadRes = await cloudinary.uploader.upload(profilePic);
        console.log("cloudinary image:", uploadRes);
        
       
        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { profilePic: uploadRes.secure_url }, 
            { new: true }
        );
        
        res.status(200).json(updatedUser);
    }
    catch (err) {
        console.log("Error in UpdateProfile:", err);
        res.status(500).json({ message: "Internal Server error!!" });
    }
}

export const checkAuth = async (req, res) => {
    try {
        
        res.status(200).json(req.user);
    } catch (err) {
        console.log("Error in checkAuth:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}