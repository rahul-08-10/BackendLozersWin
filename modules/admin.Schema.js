const mongoose =  require('mongoose');
const user = new mongoose.Schema({
    email:{
        type:String,
        unique: true,
    },
    password:{
        type:String
    },
    role:{
        type:String,
        default:'admin'
    },
    Newpassword:{
        type:String,
    },
    conformPassword:{
        type:String,
    },
    RememberMe:{
        type:Boolean,
        default:false,
    },
    profileImage: {
        type: String,
    },
    TermsAndCondition:{
        type:String,
    },
    UpdatedTime:{
        type: Date,
        default: Date.now,
    },
    privacypolicy:{
        type:String,
    },
    Bonus:{
        type:Number,
        default:50
    },
    Wallet:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'wallet'
    }

} , {timestamps:true});

const loginUser  =  mongoose.model('Admin' ,  user);
module.exports = loginUser; 