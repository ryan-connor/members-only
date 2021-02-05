//controller for user actions
const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const hidden = require('../hidden');
const { deleteOne } = require('../models/user');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const passport = require('passport');
// const jwtStrategy = require('../strategies/jwt');
// passport.use(jwtStrategy); check if this is needed here, think it can be left in app.js as middleware



//create/post a new user
exports.createUser = (req,res, next) => {

    //receive new user object from frontend
    //assume that user object from frontend is correct for now, later add san/val/error mgmt in here

    //hash password with bcrypt
    bcrypt.hash(req.body.password, hidden.salt, (err, hashedPassword) => {
        if (err) {
            console.log("error hashing password");
            return next(err);
        } else {
            //successfully hashed password
            let user = new User ({
                username: req.body.username,
                password: hashedPassword,
                privilege: req.body.privilege,
            });
        
            //save user to db
            user.save( function (err) {
                if (err) {
                    return next(err);
                }
                res.send("user successfully created");
            });
        }
    })
};

//sign in user put get privilege info for user as an action when signing in, store the info somewhere in state in the front end
exports.signIn = (req,res, next) => {
    User.findById(req.params.id).exec( (err, user) => {
        if (err) {
            return next (err);
        }
        //compare password with hashed password with bcrpyt
        bcrypt.compare( req.body.password, user.password, (err, check)=> {
            if (err) {
                return next(err);
            }
            if (check) {
                //successful login
                let response = {
                    message: "sign in successful, matched password",
                    user: {
                        userid: user.id,
                        username: user.username,
                        privilege: user.privilege,
                    }
                };
                let userResponse =  {
                        userid: user.id,
                        username: user.username,
                        privilege: user.privilege,
                    };

                //generate a jwt token with the user info in it for auth later
                let opts ={};
                opts.expiresIn = '24h';
                const secret = hidden.jwtSecret;
                const token = jwt.sign(userResponse, secret, opts);
                //currently send a user object and token with user object for testing
                return res.status(200).json({
                    message: 'sign in successful',
                    user: userResponse,
                    token: token,
                });

                //res.send(response);
                //return done(null, response);
            } else {
                //login failed, passwords don't match
                res.send("sign in failed");
                //return done(null, false, {message: "incorrect password"});
            };
        })
       
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
            //TODO: deactivate token on sign out
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

exports.profile = () => {passport.authenticate('jwt', {session: false}), (req, res) => {

    console.log("made it into profile route function");
    //protected route use passport jwt auth to access
    res.send("this is a protected route for signed in user");
}
};