const PrivacyPolicy = require('../../modules/admin.Schema'); // Adjust import to use PrivacyPolicy model

// Create or update privacy policy
const createOrUpdatePolicy = async (req, res) => {
    try {
        const { privacypolicy } = req.body; // Extract privacy policy content from request body

        // If no privacy policy content is provided in the request body
        if (!privacypolicy) {
            return res.status(400).json({
                success: false,
                message: "Please provide the privacy policy content",
            });
        }

        // Find if privacy policy already exists
        const existingPolicy = await PrivacyPolicy.findOne();

        if (existingPolicy) {
            // If a privacy policy already exists, update its content and save it
            existingPolicy.privacypolicy = privacypolicy; // Update the privacy policy content
            existingPolicy.UpdatedTime = Date.now(); // Update the timestamp
            await existingPolicy.save(); // Save the updated policy

            return res.status(200).json({
                success: true,
                message: "Privacy policy updated successfully",
                updatedPolicy: {
                    privacypolicy: existingPolicy.privacypolicy,
                    updatedBy: req.user, // Include user info who updated the policy in response only
                },
            });
        } else {
            // If no policy exists, create a new privacy policy document and save it
            const newPolicy = new PrivacyPolicy({ privacypolicy });
            await newPolicy.save(); // Save the newly created policy

            return res.status(201).json({
                success: true,
                message: "Privacy policy created successfully",
                data: newPolicy, // Return the newly created policy data
            });
        }
    } catch (error) {
        // Handle errors
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while processing the privacy policy",
        });
    }
};

// Fetch the latest privacy policy
const getPrivacyPolicy = async (req, res) => {
    try {
        const policy = await PrivacyPolicy.findOne(); // Find the latest privacy policy in the database

        if (!policy) {
            return res.status(404).json({
                success: false,
                message: "Privacy policy not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: policy, // Return the found policy data
        });
    } catch (error) {
        // Handle errors
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the privacy policy",
        });
    }
};

module.exports = {
    createOrUpdatePolicy, // Export the new function
    getPrivacyPolicy
};
