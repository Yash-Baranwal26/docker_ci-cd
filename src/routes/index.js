import express from 'express';
import userRoutes from './user.route.js';
import projectRoutes from './project.route.js';
import taskRoutes from './task.route.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);

export default router;