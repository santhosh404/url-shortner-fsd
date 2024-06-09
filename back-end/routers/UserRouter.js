import express from 'express';
import { deleteUser, updateUser, userDetails } from '../controllers/UserController.js';
import { authorize } from '../middlewares/AuthMiddleware.js';


export const UserRouter = express.Router();

UserRouter.get('/user-details', authorize, userDetails);
UserRouter.put('/update-user', authorize, updateUser);
UserRouter.delete('/delete-user', authorize, deleteUser);