require('dotenv').config();
const express = require('express');
const mongodb = require('./model/database');
const dotenv = require('dotenv');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// API Documentation


app.use((req, res, next) => {
       res.setHeader('Access-control-Allow-origin', '*');
       res.setHeader(
          'Access-Control-Allow-Headers',
          "Origin, X-Requested-with, Content-type, Accept,Z-key"
        );
        res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
        next();
    });

    


app.use('/', require('./routes'))



//start server


mongodb.initDb((err) => {
    if (err) {
        console.error('failed to initialize database:', err);
        process.exit(1);
    }

    app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
});

