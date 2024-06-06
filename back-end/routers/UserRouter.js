import express from 'express';
import { userDetails } from '../controllers/UserController.js';
import { authorize } from '../middlewares/AuthMiddleware.js';


export const UserRouter = express.Router();

UserRouter.get('/user-details', authorize, userDetails);