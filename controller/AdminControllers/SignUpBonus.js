const mongoose = require('mongoose');
const Bonus = require('../../modules/SignupBonus');

const UpdateSignUpBonus = async (req, res) => {
    try {
        const { value, type } = req.body;

        // Validate input
        if (!value || !type) {
            return res.status(400).json({
                success: false,
                message: "Please provide both value and type for the bonus",
            });
        }

        // Find and update the bonus
        const updatedBonus = await Bonus.findOneAndUpdate(
            { $set: { value: value } },
            { new: true }
        );

        if (!updatedBonus) {
            return res.status(404).json({
                success: false,
                message: "Bonus not found or could not be updated",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Sign-up bonus updated successfully",
            bonus: updatedBonus,
        });

    } catch (error) {
        console.error("Error updating sign-up bonus:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the sign-up bonus",
        });
    }
};

module.exports = { UpdateSignUpBonus };
