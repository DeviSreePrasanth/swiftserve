const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const db=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected successfully');
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

module.exports=db;