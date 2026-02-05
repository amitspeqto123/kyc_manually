import mongoose from "mongoose";

export const kycmanaualdatabse = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected successfully")
    }catch(error){
        console.log("Database connection faield");
    }
}