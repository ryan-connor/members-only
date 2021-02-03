const express = require('express');
const mongoose = require('mongoose');
const mongoDb =  require('../hidden');
const catalogRouter = require('../routes/catalog');
//consider if need cors


//mongodb connection
mongoose.connect(mongoDb.mongoUrl, {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo db connection error"));

const app = express();

//middleware to parse things correctly 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
app.listen(3000, ()=> {
    console.log("app listening on port 3000");
});