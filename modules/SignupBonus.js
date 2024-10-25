const mongoose =  require('mongoose');
const NotificationSchema  = mongoose.Schema({
    Value:{
        type:Number,
        default:50
    },
    type:{
        type:String,
    },
});

module.exports =  mongoose.model('Notification' , NotificationSchema);