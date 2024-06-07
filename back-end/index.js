import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AuthRouter } from './routers/AuthRouter.js';
import { connectDatabase } from './database/config.js';
import { UserRouter } from './routers/UserRouter.js';
import { ShortnerRouter } from './routers/ShortnerRouter.js';
import { ShortRouter } from './routers/ShortRouter.js';
import morgan from 'morgan';
dotenv.config()

//Initialize the application
const app = express();

//Initialize the middlewares
app.use(morgan('dev'))
app.use(cors());
app.use(express.json());

//Connect to database
connectDatabase()

app.get('/', (req, res) => {
    res.send('Hello World');
})

//Initalize the routes
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/user', UserRouter);
app.use('/api/v1/url', ShortnerRouter);
app.use('/', ShortRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})