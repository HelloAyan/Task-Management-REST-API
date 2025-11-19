import express from 'express';
import { register, login, getAllUsers } from '../controller/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';


const route = express.Router();

route.post('/register', register);
route.post('/login', login);
route.get('/users', verifyToken, getAllUsers)

export default route;