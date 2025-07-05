const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models/user.model')

exports.signup = async (req, res) => {

    var { user_name, email, password, confirm_password } = req.body;

    if (!user_name || !email || !password || !confirm_password) {
        return res.status(400).json({ message: "Missing Mandatory Fields" })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    try {

        if (password !== confirm_password) {
            return res.status(400).json({ message: "Password and Confirm Password Not Matched" })
        }

        var check_email = await User.findOne({
            where: { email }
        })

        if (check_email) {
            return res.status(400).json({ message: "Email Already Exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            user_name,
            email,
            password: hashedPassword,
        });

        res.status(200).json({ message: "User created successfully", });

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.login = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user.id, }, process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({ message: "Login successful", token: token });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}