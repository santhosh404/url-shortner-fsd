import express from 'express';
import { getUrl } from '../controllers/ShortnerController.js';

export const ShortRouter = express.Router();

ShortRouter.get('/:shortId', getUrl);
