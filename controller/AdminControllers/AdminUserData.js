const userData = require('../../modules/userLogin.Schema');
const adminData = require('../../modules/admin.Schema'); // Assuming admin schema is imported
// const user = async (req, res) => {
//     try {
//         const { name, email, phoneNumber, profileImage, teamName, FavourateTeam, Gender, Address } = req.body;

//         // Validate all fields
//         if (!name || !email || !phoneNumber || !profileImage || !teamName || !FavourateTeam || !Gender || !Address) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please provide all the details"
//             });
//         }

//         // Check if user already exists
//         const existingUser = await userData.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'User is already registered with this email'
//             });
//         }

//         // Fetch the bonus from the admin profile (assuming there is one admin)
//         const admin = await adminData.findOne({ role: 'admin' });
//         let bonusAmount = 0;
//         if (admin) {
//             bonusAmount = admin.Bonus;  // Get the bonus amount from the admin's profile
//         }

//         // Create new user and add the bonus directly to the user's data
//         const newUser = new userData({
//             name,
//             email,
//             phoneNumber,
//             profileImage,
//             teamName,
//             FavourateTeam,
//             Gender,
//             Address,
//             Bonus: bonusAmount  // Add the bonus amount to the user directly
//         });

//         // Save the new user
//         await newUser.save();

//         return res.status(201).json({
//             success: true,
//             data: newUser,
//             message: `User registered successfully with a bonus of ${bonusAmount}`
//         });
//     } catch (error) {
//         console.error("Error:", error);
//         return res.status(500).json({
//             success: false,
//             message: "An error occurred during registration"
//         });
//     }
// };


// Get User Data by Admin
const getUserAdmin = async (req, res) => {
    try {
        const users = await userData.find(); // Fetch all users or use query params for specific users

        if (!users || users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No users found"
            });
        }

        return res.status(200).json({
            success: true,
            data: users,
            message: "User data retrieved successfully"
        });
    } catch (error) {
        console.error("Error while fetching user data:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the user data"
        });
    }
};


module.exports = { getUserAdmin}