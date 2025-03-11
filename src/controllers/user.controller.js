import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const userSignUpController = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({
        success: false,
        message: "username, email and password all three fields are required."
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return res.status(400).json({
        success: false,
        message: "Invalid Email. Enter a valid email and try again."
    });

    if (username.length < 3 || password.length < 3) return res.status(400).json({
        success: false,
        message: "username and password must me atleast 3 characters long"
    });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({
        success: false,
        message: "Email already registered."
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        email,
        username,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    const userObj = user.toObject();
    const { password: _, ...rest } = userObj;

    return res.status(201).header("a-auth-token", token).json({
        success: true,
        message: rest
    });
}

const userLoginController = async (req, res) => {
    const { email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return res.status(400).json({
        success: false,
        message: "Invalid Email. Enter a valid email and try again."
    });

    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({
        success: false,
        message: "Invalid email or password"
    });

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) return res.status(400).json({
        success: false,
        message: "Invalid Email. Enter a valid email and try again."
    });

    const token = user.generateAuthToken();
    return res.status(200).json({
        success: true,
        message: "Login Successfull",
        token
    });
}

export {
    userSignUpController,
    userLoginController
}