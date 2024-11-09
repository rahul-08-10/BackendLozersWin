const userDetails = require("../../modules/userLogin.Schema");
const adminDetails = require('../../modules/admin.Schema');
const Wallet = require("../../modules/wallet");
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
// const otpGenerator = require('otp-generator');
require('dotenv').config();



function generateOTP(length) {
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10); // Generate a random digit (0-9)
    }
    return otp;
}

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

        // If user is not present, register the user and generate OTP
        if (!existingUser) {
            const generatedOtp =generateOTP(4)

            // Fetch Bonus value from adminDetails
            const admin = await adminDetails.findOne(); // Fetch the first document 
            const bonusAmount = admin ? admin.Bonus : 0; 

            // Referral bonus logic
            let referralBonus = 0;
            if (referralCode) {
                // Check if the referral code exists and belongs to an existing user
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

            // Create new wallet with a default balance and bonus (without referral bonus added to the wallet)
            const newWallet = new Wallet({
                MyBalance: 50, // Set initial balance to 50
                Deposite: 0,
                Winnings: 0,
                Status: "Active",
                Bonus: bonusAmount, // Only the regular bonus, no referral bonus here
            });
            await newWallet.save();

            // Create new user with a reference to the wallet
            const newUser = new userDetails({
                userId: uuidv4(), 
                email: email || null,
                phoneNumber: phoneNumber || null,
                otp: generatedOtp,
                wallet: newWallet._id, // Assign the wallet's ObjectId
                referralCode: uuidv4(),  // Generate a unique referral code for the user
                referralBonus: referralBonus, // Store the referral bonus separately
                Bonus: newWallet.Bonus
            });

            await newUser.save();

            // Populate wallet data before sending response
            const populatedUser = await userDetails.findById(newUser._id).populate('wallet');

            // Optionally, send the OTP to the user's phone or email here
            return res.status(201).json({
                success: true,
                message: "User registered successfully. OTP has been generated.",
                otp: generatedOtp, // Return OTP for testing purposes (remove in production)
                referralBonus: newUser.referralBonus, // Return the referral bonus separately
                referralCode: newUser.referralCode,  // Return the generated referral code
                wallet: populatedUser.wallet // Return wallet data
            });
        } else {
            // If user exists, verify the OTP
            if (!otp) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide the OTP for verification.",
                });
            }

            // Check if the OTP matches
            if (existingUser.otp !== otp) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid OTP. Please try again.",
                });
            }

            // Generate a token for the user after successful OTP verification
            const token = jwt.sign({ id: existingUser._id }, process.env.JWT, { expiresIn: '7d' });
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


module.exports = { registerOrLogin};
