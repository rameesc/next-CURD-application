
import mongoose from "mongoose";


export const DbConnection=async()=>{

    try{
        await mongoose.connect(process.env.DB_URL!)
        console.log("successfully conneted")


    }catch(error){
        console.log(error)
    }
}