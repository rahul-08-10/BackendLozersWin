const mongoose =  require('mongoose');
require('dotenv').config();
const database  =  async(req , res)=>{
    try{
        await mongoose.connect(process.env.URL);
        console.log('Database is connected');
    }
    catch(error){
        console.log('Connection Fails');
        process.exit(1);
    }
}
module.exports =  database; 