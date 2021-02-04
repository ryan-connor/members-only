//controller for user actions
const express = require('express');
const User = require('../models/user');

//create/post a new user
exports.createUser = (req,res, next) => {

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
};

//sign in user? not sure if should go here or elsewhere, put get privilege info for user as an action when signing in, store the info somewhere in state in the front end
exports.signIn = (req,res, next) => {
    User.findById(req.params.id).exec( (err, user) => {
        if (err) {
            return next (err);
        }
        //for testing using raw password comparison, will update for security later with passport and bcrpyt
        if (user.password === req.body.password) {
            let response = {
                message: "sign in successful, matched password",
                user: {
                    userid: user.id,
                    username: user.username,
                    privilege: user.privilege,
                }
            };
            res.send(response);
        }
        else {
            res.send("sign in failed")
        };
        
    });

    //receive sign in from frontend and go through auth for user
    //return token/user privileges/user stuff
};


exports.signOut = (req,res, next) => {


    User.findById(req.params.id).exec( (err, user) => {
        if (err) {
            res.send("error signing out");
        }
        else {
            let response = {
                message: "sign out successful",
                user: {
                    userid: user.id,
                    username: user.username,
                    privilege: user.privilege,
                }
            }
            res.send(response);

    }
    }
    );

    // res.send("sign out for user not implemented yet");
    //receive user id and request to sign out from frontend
    //return some sort of sign out message
};

