const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userLogin = require('../../modules/admin.Schema'); // Adjust the path based on your structure

const registerAdmin = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password",
                success: false,
            });
        }

        // Check if the user already exists
        const existingUser = await userLogin.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please log in instead.",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new userLogin({
            email: email,
            password: hashedPassword,
            role: role || "admin", // You can define the default role if needed
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: newUser._id,
                email: newUser.email,
                role: newUser.role
            },
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred.",
        });
    }
};



const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password",
                success: false,
            });
        }

        // Check if the user exists in the database
        const existingUser = await userLogin.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "User does not exist. Please register.",
            });
        }

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials. Please check your email or password.",
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: existingUser._id, role: existingUser.role }, process.env.JWT, { expiresIn: '7d' });
        console.log(token);

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred.",
        });
    }
};

module.exports = { loginAdmin  , registerAdmin};

