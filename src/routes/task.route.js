import express from 'express';
import Task from '../controllers/task.controller.js';
import auth from '../middileware/auth.middileware.js';

const router = express.Router();

router.post('/tasks', auth, Task.createTasK);
router.get('/projects/:projectId/tasks', auth, Task.getProjectTasks);
router.get('/tasks/:taskId', auth, Task.getTaskById);
router.patch('/tasks/:taskId', auth, Task.updateTask);
router.delete('/tasks/:taskId', auth, Task.deleteTask);

export default router;
