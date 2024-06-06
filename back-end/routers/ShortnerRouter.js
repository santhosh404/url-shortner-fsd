import express from 'express';
import { authorize } from '../middlewares/AuthMiddleware.js';
import { myUrls, shortenUrl } from '../controllers/ShortnerController.js';


export const ShortnerRouter = express.Router();

ShortnerRouter.post('/shorten', authorize, shortenUrl);
ShortnerRouter.get('/my-urls', authorize, myUrls);