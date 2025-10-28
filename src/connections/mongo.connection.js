import mongoose from "mongoose";

const connection = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB connected successfuly")
    } catch (error) {
        console.log("Db not connected")
    }
}

export default connection