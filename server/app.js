// imports
require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static('./uploads'))

// Database Connection
mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to Database!"))
    .catch((err) => console.log("Error Connecting to Database!!", err))

// Routes Prefix
app.use('/api/post', require('./routes/routes'))

// Start Server
app.listen(port, ()=> console.log(`Server running at http://localhost:${port}.....`))