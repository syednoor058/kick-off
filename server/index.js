const express = require('express')
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

//Database connection
connectDB();

//Middlewares
app.use(express.json());
app.use(morgan('dev'));

app.get('/api', (req, res) => {
    res.send({
        message: "Welcome to Kick-off backend."
    })
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
    
})