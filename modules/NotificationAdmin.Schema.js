const mongoose =  require('mongoose');
const NotificationSchema  = mongoose.Schema({
    UserType:{
        type:String,
        enum:['All' , '15 Days' , '30 Days and More'],
    },
    title:{
        type:String,
    },
    message:{
        type:String,
    },
    ContentName:{
        type:String,
    },
    ContentDescription:{
        type:String,
    },
    Match:{
        type:String,
    }
});

module.exports =  mongoose.model('Notification' , NotificationSchema);