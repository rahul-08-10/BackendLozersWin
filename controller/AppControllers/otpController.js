// controllers/otpController.js
const User = require('../../modules/userLogin.Schema');
const verifyOtp = async (req, res) => {
    const { phoneNumber, otp } = req.body;

    try {
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if OTP matches and is not expired
        if (user.otp === otp && Date.now() < user.otpExpiration) {
            user.otp = null; // Clear OTP after verification
            user.otpExpiration = null; // Clear expiration date
            await user.save();

            res.status(200).json({ message: 'OTP verified successfully. You are now registered.' });
        } else {
            res.status(400).json({ message: 'Invalid or expired OTP.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { verifyOtp };
