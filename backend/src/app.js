const express = require('express');
const path = require('path');
const session = require('session');
const mongoose = require('mongoose');
const mongoDb =  require('../hidden');
//consider if need cors


//mongodb connection
mongoose.connect(mongoDb.mongoUrl, {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo db connection error"));


const app = express();


//basic template routes

//add in a router to actual routes later

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


//make port a variable from a config file later
app.listen(3000, ()=> {
    console.log("app listening on port 3000");
});