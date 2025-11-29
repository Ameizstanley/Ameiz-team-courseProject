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

