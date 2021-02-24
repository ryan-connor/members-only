const express = require('express');
const mongoose = require('mongoose');
const mongoDb =  require('../hidden');
const catalogRouter = require('../routes/catalog');
const bodyParser = require("body-parser");
//consider if need cors
const passport = require('passport');
const jwtStrategy = require('../strategies/jwt');
const cors = require('cors');
const expressValidator = require('express-validator');


//mongodb connection
mongoose.connect(mongoDb.mongoUrl, {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo db connection error"));

const app = express();


app.use(cors()); //temporarily allow cors for development

//use passport middleware
passport.use(jwtStrategy); 


//middleware to parse things correctly 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//use express-validator middleware
app.use(expressValidator());

//router to user and message routes in catalog
app.use('/', catalogRouter); //leaving catalog router as the home router, 

//basic template routes
app.get('/', (req,res) => {
    res.send("Http get request");
});

app.post('/', (req,res)=> {
    res.send("Http post request");
});

app.put('/', (req,res) => {
    res.send("Http put/update request");
});

app.delete('/', (req,res) => {
    res.send("Http delete request");
});


//start app listening
app.listen(8000, ()=> {
    console.log("app listening on port 8000");
});