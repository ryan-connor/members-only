//controller for user actions
const express = require('express');
const User = require('../models/user');


//create/post a new user
app.post('/user', (req,res)=> {

    //receive new user object from frontend
    //assume that user object from frontend is correct for now, later add san/val/error mgmt in here
    let user = new User ({
        username: req.body.username,
        password: req.body.password,
        privilege: req.body.privilege,
    });

    //save user to db
    user.save( function (err) {
        if (err) {
            return next(err);
        }
        res.send("user successfully created");
    });

});


//sign in user? not sure if should go here or elsewhere, put get privilege info for user as an action when signing in, store the info somewhere in state in the front end
app.get('/user/:userid', (req,res)=> {

    res.send("sign in for user not implemented yet");
    //receive sign in from frontend and go through auth for user
    //return token/user privileges/user stuff

});

//sign out user? not sure if should go here or elsewhere, might not be a get request, could possibly be a post?
app.get('/user/:userid', (req, res)=> {

    res.send("sign out for user not implemented yet");
    //receive user id and request to sign out from frontend
    //return some sort of sign out message

});