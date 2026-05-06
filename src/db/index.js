import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

//we are using async function here because db is anohter
//continent
const connectDB=async()=>{
try{
    //MONGOOSE return an object so it can store to any variable
    const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    //kis host pr connect ho rhy hain
    console.log(`Mongodb connected !! DB HOST: ${connectionInstance.connection.host}`)
}
catch(error){
    console.log("MONGODB CONNECTION FAILED", error)
    //process current mn jo process run ho rha hota uska reference hota hai..this is 
    //the feature of node js
    process.exit(1)
}
}
export default connectDB
