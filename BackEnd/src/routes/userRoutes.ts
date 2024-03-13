// routes/userRoutes.ts
import express from 'express';
import { getAllUsers, getUserById }  from '../controllers/userController' ;

const userRoutes = express.Router();
userRoutes.get('/', getAllUsers);
userRoutes.get('/:id', getUserById);

export default userRoutes;
