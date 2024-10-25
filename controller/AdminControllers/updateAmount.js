// controller/AdminControllers/updateAdminBonus.js
const Admin = require('../../modules/admin.Schema');

const updateAdminBonus = async (req, res) => {
    try {
        const { Bonus } = req.body;

        // Validate input
        if (!Bonus) {
            return res.status(400).json({
                success: false,
                message: "Bonus must be a required."
            });
        }

        // Assuming you want to update the first admin's bonus
        const admin = await Admin.findOne(); // Modify as necessary to target a specific admin

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found."
            });
        }

        // Update admin's bonus
        admin.Bonus = Bonus;
        await admin.save();

        return res.status(200).json({
            success: true,
            message: "Bonus updated successfully.",
            Bonus: admin.Bonus
        });
    } catch (error) {
        console.error("Error updating bonus:", error);
        return res.status(500).json({
            success: false,
            message: "Error updating bonus"
        });
    }
};

module.exports = { updateAdminBonus };
