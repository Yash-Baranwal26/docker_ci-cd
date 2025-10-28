import Project from "../models/project.model.js";

const routes = {}

routes.createProject = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id;

        if(!title || !description){
            return res.status(400).json({message:"All fields are required"})
        }

        const existingProject = await Project.find({title});
        if(existingProject.length > 0){
            return res.status(400).json({message:"Project title already exists"})
        }

        const newProject = new Project({title, description, userId});
        await newProject.save();

        return res.status(201).json({message:"Project created successfully", project:newProject})

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

routes.updateProjectStatus = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { status, description } = req.body;
        const userId = req.user.id;

        if(!status && !description){
            return res.status(400).json({message:"Atleast one field is required"})
        }

        const project = await Project.findById(projectId);
        if(!project){
            return res.status(404).json({message:"Project not found"})
        }

        if(project.userId.toString() !== userId){
            return res.status(403).json({message:"You are not authorized to update this project"})
        }   

        if(status) project.status = status;
        if(description) project.description = description;
        await project.save();

        return res.status(200).json({message:"Project updated successfully", project})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

routes.getUsersProjects = async (req, res) => {
    try {
        const userId = req.user.id;

        const projects = await Project.find({userId}).sort({createdAt:-1});

        return res.status(200).json({projects})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

routes.getProjectById = async (req, res) => {
    try {
        const { projectId } = req.params;
        const userId = req.user.id;

        const project = await Project.findById(projectId);
        if(!project){
            return res.status(404).json({message:"Project not found"})
        }   
        if(project.userId.toString() !== userId){
            return res.status(403).json({message:"You are not authorized to view this project"})
        }

        return res.status(200).json({project})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

routes.deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const userId = req.user.id;

        const project = await Project.findById(projectId);
        if(!project){
            return res.status(404).json({message:"Project not found"})
        }   

        if(project.userId.toString() !== userId){
            return res.status(403).json({message:"You are not authorized to delete this project"})
        }   

        await Project.findByIdAndDelete(projectId);

        return res.status(200).json({message:"Project deleted successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export default routes;