const express = require('express');
const app = express();
app.disable('etag').disable('x-powered-by');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
app.listen(process.env.PORT || 3001, process.env.IP, () => {
    console.log('Server Listening on Port 3001')
})


const errorHandler = require('./handlers/errorHandler');
require('dotenv').config();
// Middleware
// const { loginRequired, ensureCorrectUser } = require('./middleware');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Database
require('./models/index');


// Seed database
// require('./seed')();

// Routes
const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/user');
const internshipRoutes = require('./routes/internship')


// Incuding Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/internship', internshipRoutes)


app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(errorHandler);
