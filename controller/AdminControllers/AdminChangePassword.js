const change = require('../../modules/admin.Schema');
const bcrypt = require('bcrypt');

const update = async (req, res) => {
    const { id } = req.params; 
    const { password, Newpassword, conformPassword } = req.body;

    try {
        // Check if all fields are provided
        if (!password || !Newpassword || !conformPassword) {
            return res.status(400).json({
                success: false,
                message: "Provide all details"
            });
        }

        // Check if the new password and confirm password match
        if (Newpassword !== conformPassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirm password do not match"
            });
        }

        // Find the user by ID
        const user = await change.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Check if the old password is correct
        const isOldPasswordValid = await bcrypt.compare(password, user.password);
        if (!isOldPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Old password is incorrect"
            });
        }

        // Hash the new password and update it
        const hashedNewPassword = await bcrypt.hash(Newpassword, 10);
        user.password = hashedNewPassword; // Update the user's password
        await user.save(); // Save the changes

        return res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

module.exports = { update };
