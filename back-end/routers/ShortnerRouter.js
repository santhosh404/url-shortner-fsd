import express from 'express';
import { authorize } from '../middlewares/AuthMiddleware.js';
import { getUrlDetails, myUrls, shortenUrl } from '../controllers/ShortnerController.js';


export const ShortnerRouter = express.Router();

ShortnerRouter.post('/shorten', authorize, shortenUrl);
ShortnerRouter.get('/my-urls', authorize, myUrls);
ShortnerRouter.get('/url-details', authorize, getUrlDetails);