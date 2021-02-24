//controller for message actions
const express = require('express');
const message = require('../models/message');
const Message = require('../models/message');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');

//post a new message
exports.createMessage = (req, res, next) => {

    //check validationresults for errors in validation/sanitization
    const errors= validationResult(req);

    if (!errors.isEmpty()) {
        //errors exist in val/san
        res.status(422).json({errors});
        return;
    };

        //get passed message object from frontend

        // console.log(req.body);

        let message = new Message ({
            content: req.body.content,
            datePosted: req.body.datePosted,
            user: req.body.user,
        });
    
        //save to mongodb
        message.save( function (err) {
            if (err) {
                return next(err);
            };
            res.send("message saved successfully");
        });
};

//get all messages for frontend display
exports.getMessages = (req,res, next) => {
        //query db to get all messages, find all, populate author, sort by date,
        Message.find({}, 'content datePosted user').populate({path:'user', select:'username'}).sort([['datePosted','descending']]).exec(function (err, listMessages) {
            if (err) {return next(err)};
            //if no errors then return all messages
            res.send( {messageList: listMessages}); //see if returns a nice array or not
        });
}

exports.editMessage = (req, res, next) => {

    //check validationresults for errors in validation/sanitization

    //passport verifies that jwt is good, add in passport to return user info from payload

    console.log("req to backend edit route:", req.body);
    console.log("from passport:", req.user);

    //query db to find specific message from request assuming jwt auth is good
    Message.findById(req.params.id, function editMessage(err, doc) {

         if (err) {return next(err)};

         console.log("mongoose doc:", doc);
        //check that message created by user in db matches jwt user
        if(doc.user.toString() === req.user.userid) {
            
            console.log("message created by matches jwt user");

            //update message content and date
            doc.content = req.body.content;
            doc.datePosted = req.body.datePosted;

            //save updated message with new contents and date
            doc.save(function (err) {
            if (err) {
                    return next(err);
                };
            res.send("message saved successfully");
        }); 

        } else {
            res.send("can't edit messages from other users");
        };



    });


    //res.send("edit message not implemented in backend yet, but passport auth for this should be good");

};

//delete a message
exports.deleteMessage = (req, res, next) => {
    //passport checks that jwt is good

    //if user from jwt is an admin then delete the message
    if (req.user.privilege === "admin") {
        
                //find message by id that is passed through front end request and delete
                Message.findByIdAndRemove(req.params.id, function deleteMessage(err) {
                    if (err) {return next(err)};
                    res.send("message deleted successfully");
                });
    } else {
        res.send("Only admins can delete messages");
    };

};


//message validation/sanitization function, currently does basic check of request body for length, trim whitespace and escape HTML characters
exports.validate = () => {

    return [body('content','Invalid Username').trim().isLength({ min: 1 }).escape(),
            body('datePosted','Invalid Password').trim().isLength({ min: 1 }).escape(),
            body('user', 'Invalid User').trim().isLength({min:1}).escape()
        ];
};

