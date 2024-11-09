const Banner = require("../../modules/admin.Schema");

// Create a new banner
const createBanner = async (req, res) => {
    const imagePath = req.file ? req.file.path : null;
    console.log("image path :::::::::::::::" , imagePath);
    if (!imagePath) {
        return res.status(400).json({ message: "Image is required." });
    }

    try {
        const newBanner = new Banner({ profileImage: imagePath });
        await newBanner.save();
        res.status(201).json({ message: "Banner created successfully.", profileImage: newBanner });
        console.log("new banner ::::::::::", newBanner);
    } catch (error) {
        console.error("Error creating banner:", error);
        res.status(500).json({ message: "Error creating banner." });
    }
};

// Update an existing banner
const updateBanner = async (req, res) => {
    const imagePath = req.file ? req.file.path : null;
    const { id } = req.params; // Ensure you're passing the banner ID in the request parameters

    try {
        const banner = await Banner.findById(id); // Use Banner instead of profileImage
        if (!banner) {
            return res.status(404).json({ message: "Banner not found." });
        }
        if (imagePath) {
            banner.profileImage = imagePath; // Update image if a new one is uploaded
        }
        banner.updatedAt = Date.now();
        
        await banner.save();
        res.status(200).json({ message: "Banner updated successfully.", banner });
    } catch (error) {
        console.error("Error updating banner:", error);
        res.status(500).json({ message: "Error updating banner." });
    }
};

// Get all banners
const getBanners = async (req, res) => {
    try {
        const banners = await Banner.find(); // Use Banner instead of profileImage
        res.status(200).json(banners);
    } catch (error) {
        console.error("Error retrieving banners:", error);
        res.status(500).json({ message: "Error retrieving banners." });
    }
};

module.exports = { createBanner, updateBanner, getBanners };
