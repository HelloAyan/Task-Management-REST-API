import express from 'express';
import { createTask, getTasks, getTaskById } from '../controller/taskController.js';

const route = express.Router();

route.post('/create-task', createTask);
route.get('/all-task', getTasks);
route.get('/task/:id', getTaskById);

export default route;