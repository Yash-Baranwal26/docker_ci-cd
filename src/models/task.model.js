import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    status:{
        enum:["todo", "in-progress", "completed"],
        type:String,
        default:"todo",
    },
    dueDate:{
        type:Date,
        required:true,
    },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required:true,
    },
},{timestamps:true})

const Task = mongoose.model("Task", taskSchema);
export default Task
