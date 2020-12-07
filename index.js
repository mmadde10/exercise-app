const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const mongoose = require('mongoose');
const passport = require("passport");
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const indexRouter = require('./routes/index')

app.use(cors());
app.use(bodyParser.json());

require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
    mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
    connection.once('open', () => {
        console.log("MongoDB database connection established successfully");
});
app.use('/', indexRouter);
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});