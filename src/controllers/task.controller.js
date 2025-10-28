import Task from "../models/task.model.js";


const routes = {}

routes.createTasK = async (req, res) => {
    try {
        const { title, description, dueDate, projectId } = req.body;
        const userId = req.user.id;
        if(!title || !description || !dueDate || !projectId){
            return res.status(400).json({message:"All fields are required"})
        }
        const newTask = new Task({title, description, dueDate, projectId});
        await newTask.save();
        return res.status(201).json({message:"Task created successfully", task:newTask})

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

routes.getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status } = req.query; // get status from query string

    let filter = { projectId };

    if (status) {
      filter.status = status; // add status filter only if provided
    }

    const tasks = await Task.find(filter);
    return res.status(200).json({ tasks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};


routes.getTaskById = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId);
        if(!task){
            return res.status(404).json({message:"Task not found"})
        }
        return res.status(200).json({task})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

routes.updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { title, description, status, dueDate } = req.body;

        if(!title && !description && !status && !dueDate){
            return res.status(400).json({message:"Atleast one field is required"})
        }

        const task = await Task.findById(taskId);
        if(!task){
            return res.status(404).json({message:"Task not found"})
        }

        if(title) task.title = title;
        if(description) task.description = description;
        if(status) task.status = status;
        if(dueDate) task.dueDate = dueDate;
        await task.save();

        return res.status(200).json({message:"Task updated successfully", task})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

routes.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId);
        if(!task){
            return res.status(404).json({message:"Task not found"})
        }

        await Task.findByIdAndDelete(taskId);
        return res.status(200).json({message:"Task deleted successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export default routes;