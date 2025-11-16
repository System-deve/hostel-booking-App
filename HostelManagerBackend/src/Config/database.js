import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config()

const ConnectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongoose Connected Successfully")
    } catch(error){
        console.log("Database Connection Failed", error);
        process.exit(1)

    }
}
export default ConnectDB;