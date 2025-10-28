import express from 'express';
import User from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', User.registerUser);
router.post('/login', User.loginUser);

export default router;
