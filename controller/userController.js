import User from "../model/userModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const userData = new User(req.body);
        const { name, email, password } = userData;
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
        const JWT_token = jwt.sign({ id: exitUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).json({ message: "Login Successful", JWT_token });
    } catch (error) {
        res.status(500).json({ message: "server Error" });
    }
}