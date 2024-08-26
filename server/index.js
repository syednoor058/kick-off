import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { isAdmin, requireSignIn } from './middlewares/authMiddleware.js';
import authRoute from "./routes/authRoute.js";


dotenv.config();
const app = express();
//Database connection
connectDB();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// All routes
app.use('/api/v1/auth', authRoute)
app.get('/api', requireSignIn, isAdmin, (req, res) => {
    res.send({
        message: "Welcome to Kick-off backend."
    })
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
    
})