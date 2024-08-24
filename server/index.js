const express = require('express')
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.get('/api', (req, res) => {
    res.send({
        message: "Welcome to Kick-off backend."
    })
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
    
})