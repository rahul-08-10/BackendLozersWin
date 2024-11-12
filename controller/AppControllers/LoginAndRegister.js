const userDetails = require("../../modules/userLogin.Schema");
const adminDetails = require('../../modules/admin.Schema');
const Wallet = require("../../modules/wallet");
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Commented out the generateOTP function as per the request
// function generateOTP(length) {
//     let otp = '';
//     for (let i = 0; i < length; i++) {
//         otp += Math.floor(Math.random() * 10); // Generate a random digit (0-9)
//     }
//     return otp;
// }

const registerOrLogin = async (req, res) => {
    const { email, phoneNumber, otp, referralCode } = req.body;

    try {
        if (!email && !phoneNumber) {
            return res.status(400).json({
                message: "Please provide at least one detail: email or phone number.",
                success: false,
            });
        }

        // Check for existing user
        const existingUser = await userDetails.findOne({ email, phoneNumber }).populate('wallet');

        // If user is not present, register the user and generate static OTP
        if (!existingUser) {
            const generatedOtp = "1234"; // Static OTP

            // Fetch Bonus value from adminDetails
            const admin = await adminDetails.findOne(); 
            const bonusAmount = admin ? admin.Bonus : 0; 

            // Referral bonus logic
            let referralBonus = 0;
            if (referralCode) {
                const referredUser = await userDetails.findOne({ referralCode });
                if (referredUser) {
                    referralBonus = 10; // Example referral bonus amount
                } else {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid referral code.",
                    });
                }
            }

            // Create new wallet with a default balance and bonus
            const newWallet = new Wallet({
                MyBalance: 50, 
                Deposite: 0,
                Winnings: 0,
                Status: "Active",
                Bonus: bonusAmount, 
            });
            await newWallet.save();

            // Create new user with a reference to the wallet
            const newUser = new userDetails({
                userId: uuidv4(),
                email: email || null,
                phoneNumber: phoneNumber || null,
                otp: generatedOtp,
                wallet: newWallet._id,
                referralCode: uuidv4(),
                referralBonus: referralBonus,
                Bonus: newWallet.Bonus
            });

            await newUser.save();

            // Populate wallet data before sending response
            const populatedUser = await userDetails.findById(newUser._id).populate('wallet');

            return res.status(201).json({
                success: true,
                message: "User registered successfully. OTP has been generated.",
                otp: generatedOtp, 
                referralBonus: newUser.referralBonus,
                referralCode: newUser.referralCode,
                wallet: populatedUser.wallet 
            });
        } else {
            // If user exists, verify the OTP
            if (!otp) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide the OTP for verification.",
                });
            }

            // Check if the OTP matches (static OTP is 1234)
            if (existingUser.otp !== "1234") {
                return res.status(400).json({
                    success: false,
                    message: "Invalid OTP. Please try again.",
                });
            }

            // Generate a token for the user after successful OTP verification
            const token = jwt.sign({ id: existingUser._id }, process.env.JWT, { expiresIn: '1h' }); // Set the token expiration time to 1 hour
            const decoded = jwt.decode(token);
            console.log("Decoded token:", decoded);
            return res.status(200).json({
                success: true,
                user: existingUser,
                token,
                wallet: existingUser.wallet,
                message: "User logged in successfully.",
            });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred.",
        });
    }
};

const logout = async (req, res) => {
    try {
        // Ideally, you handle token deletion on the client side, so we just send a response here.
        res.clearCookie("token"); // If you're storing JWT in a cookie.
        
        // Send a response back that the logout was successful
        return res.status(200).json({
            success: true,
            message: "Logged out successfully.",
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred during logout.",
        });
    }
};

module.exports = { registerOrLogin, logout };
