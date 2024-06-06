import express from 'express';
import { activateAccount, forgotPassword, resetPassword, signIn, signUp } from '../controllers/AuthController.js';


export const AuthRouter = express.Router();

AuthRouter.post('/sign-up', signUp);
AuthRouter.post('/sign-in', signIn);
AuthRouter.post('/forgot-password', forgotPassword);
AuthRouter.post('/reset-password/:id/:token', resetPassword);
AuthRouter.post('/activate-account/:id', activateAccount);