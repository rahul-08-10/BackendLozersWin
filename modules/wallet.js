const mongoose =  require('mongoose');
const WellatSchema  = mongoose.Schema({
    MyBalance:{
        type:String,
        
    },
    Deposite:{
        type:String,
    },
    Winnings:{
        type:String,
    },
    Status:{
        type:String,
    },
    Bonus:{
        type:String,
    }
});

module.exports =  mongoose.model('Wallet' ,  WellatSchema );