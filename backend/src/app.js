const express = require('express');
const mongoose = require('mongoose');
const mongoDb =  require('../hidden');
const catalogRouter = require('../routes/catalog');
const passport = require('passport');
const jwtStrategy = require('../strategies/jwt');
const cors = require('cors');

//mongodb connection
mongoose.connect(mongoDb.mongoUrl, {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo db connection error"));

const app = express();

app.use(cors()); //allow cors for development

//use passport middleware
passport.use(jwtStrategy); 

//middleware to parse things correctly 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//router to user and message routes in catalog
app.use('/', catalogRouter);

//start app listening
app.listen(8000, ()=> {
    console.log("app listening on port 8000");
});