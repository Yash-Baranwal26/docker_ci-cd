import express from 'express';
import Project from '../controllers/project.controller.js';
import auth from '../middileware/auth.middileware.js';

const router = express.Router();

router.post('/projects', auth, Project.createProject);
router.get('/projects', auth, Project.getUsersProjects);
router.get('/projects/:projectId', auth, Project.getProjectById);
router.patch('/projects/:projectId', auth, Project.updateProjectStatus);
router.delete('/projects/:projectId', auth, Project.deleteProject);

export default router;