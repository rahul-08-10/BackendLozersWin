const NotificationSchema = require('../../modules/NotificationAdmin.Schema');
const User = require('../../modules/userLogin.Schema');

// create the Notification 
const Notification =  async(req ,res)=>{
    try{
        const {UserType , title , message , Match , contestName} =  req.body;
        // validation
        if(!UserType || !title || !message){
            return res.status(401).json({
                success:false,
                message:"Provide All Details"
            });
        }

        const newNotification = new NotificationSchema({
            UserType:UserType || null,
            title:title || null,
            message :message || null,
            Match :Match || null,
            contestName : contestName || null
        });
        await newNotification.save();

        return res.status(200).json({
            success:true,
            newNotification,
            message:"Notification has been created"
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error While Creating the Notification"
        });
    }
}


const getNotifications = async (req, res) => {
    try {
        const notifications = await NotificationSchema.find({});

        if (notifications.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No notifications found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Notifications fetched successfully",
            notifications // Return all notifications
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while fetching notifications",
        });
    }
};

module.exports = { Notification, getNotifications };
