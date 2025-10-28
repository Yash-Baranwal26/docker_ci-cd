import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type:String,
        enum:["active","Completed"],
        default:"active",
    }
},{timestamps:true})

const Project = mongoose.model("Project", projectSchema);
export default Project