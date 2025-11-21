import User from "../model/userModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const userData = new User(req.body);
        const { name, email, password } = userData;
        if (req.file) {
            userData.profilePhoto = req.file.path;
        }
        const exitUser = await User.findOne({ email });
        if (exitUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hasPass = await bcrypt.hash(password, 10);
        userData.password = hasPass;
        const saveUserData = await userData.save();
        res.status(201).json({
            message: "User Registered Successfully",
            saveUserData
        });

    } catch (error) {
        res.status(500).json({ message: "Servr Error" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const exitUser = await User.findOne({ email });
        if (!exitUser) {
            return res.status(400).json({ message: "user not found" });
        }
        const matchPass = await bcrypt.compare(password, exitUser.password);
        if (!matchPass) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { id: exitUser._id, role: exitUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: exitUser._id,
                name: exitUser.name,
                email: exitUser.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "server Error" });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logout Successful" })
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error " });
    }
}