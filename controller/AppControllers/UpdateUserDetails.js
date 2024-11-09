const update = require('../../modules/userLogin.Schema'); 

const updateCandidateData = async (req, res) => {
    const userId = req.body.id;
    const { name, email, phoneNumber, DOB, Gender } = req.body; 
    const profileImage = req.file ? req.file.filename : null; 

    try {
        // Fetch the existing user data
        const existingUser = await update.findById(userId);
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Log the existing user data
        console.log("Existing User Document:", existingUser);

        // Prepare the update object
        const updateData = {
            name: name || existingUser.name,  
            email: email || existingUser.email, 
            phoneNumber: phoneNumber || existingUser.phoneNumber, 
            DOB: DOB || existingUser.DOB,  
            Gender: Gender || existingUser.Gender, 
            profileImage: profileImage || existingUser.profileImage, 
        };

        // Update the user document
        const updatedUser = await update.findByIdAndUpdate(userId, { $set: updateData }, { new: true });

        console.log("Updated User Document:", updatedUser);

        return res.status(200).json({
            success: true,
            data: updatedUser,
            message: "User updated successfully",
        });

    } catch (error) {
        console.error("Error in updating user:", error);
        return res.status(500).json({
            success: false,
            message: "Error in updating the user",
        });
    }
};

module.exports = updateCandidateData;
