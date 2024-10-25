const TermsAndConditions = require('../../modules/admin.Schema');

const createOrUpdateTerms = async (req, res) => {
    try {
        const {  TermsAndCondition } = req.body;

        if (! TermsAndCondition) {
            return res.status(400).json({
                success: false,
                message: "Please provide the terms and conditions content",
            });
        }
        // Check if terms and conditions already exist
        const existingTerms = await TermsAndConditions.findOne();

        if (existingTerms) {
            // Update existing terms and conditions
            existingTerms.TermsAndCondition = TermsAndCondition;
            existingTerms.UpdatedTime= Date.now();
            await existingTerms.save();

            return res.status(200).json({
                success: true,
                message: "Terms and conditions updated successfully",
                data: existingTerms,
            });
        } else {
            // Create new terms and conditions
            const newTerms = new TermsAndConditions({ TermsAndCondition });
            await newTerms.save();

            return res.status(201).json({
                success: true,
                message: "Terms and conditions created successfully",
                data: newTerms,
            });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while processing terms and conditions",
        });
    }
};

// Fetch the latest terms and conditions
const getTermsAndConditions = async (req, res) => {
    try {
        const terms = await TermsAndConditions.findOne();
        
        if (!terms) {
            return res.status(404).json({
                success: false,
                message: "Terms and conditions not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: terms,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching terms and conditions",
        });
    }
};

module.exports = {
    createOrUpdateTerms,
    getTermsAndConditions,
};
