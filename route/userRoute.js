import express from 'express';
import { register, login, getAllUsers, logout } from '../controller/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';


const route = express.Router();

route.post('/register', register);
route.post('/login', login);
route.get('/users', verifyToken, authorizeRoles("admin"), getAllUsers);
route.post('/logout', logout);

export default route;