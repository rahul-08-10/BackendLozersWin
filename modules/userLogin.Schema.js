const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true, // Ensure no duplicate user IDs
        required: true
    },
    email: {
        type: String,
        unique: true, // Ensures no duplicate emails
    },
    phoneNumber: {
        type: String, // Changed to String for consistency
        unique:true
    },
    otp: {
        type: String,
    },
    panCard: {
        type: String,
    },
    bankAccount: {
        type: String,
    },
    otpExpires: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
    },
    newPassword: {
        type: String,
    },
    confirmPassword: {
        type: String,
    },
    rememberMe: {
        type: Boolean,
        default: false,
    },
    // Fields from UpdateProfile schema
    name: {
        type: String,
    },
    dob: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    teamName: {
        type: String,
    },
    FavourateTeam: {
        type: String,
    },
    Gender: {
        type: String,
    },
    Address: {
        type: String,
    },
    // Added Bonus field
    Bonus: {
        type: Number,  // Stores the bonus amount
        default: 0,    // Default value set to 0
    },
    // Reference to Wallet model
    wallet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet', // Assuming your wallet model is named 'Wallet'
    }
}, {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

// Creating the User model
const User = mongoose.model('Customer', userSchema);
module.exports = User;
