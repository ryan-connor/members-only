//controller for message actions
const express = require('express');
const message = require('../models/message');
const Message = require('../models/message');
const passport = require('passport');
const jwt = require('jsonwebtoken');

//post a new message
exports.createMessage = (req, res, next) => {
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

exports.editMessage = () => {passport.authenticate('jwt', {session: false}), (req, res, next) => {

    //passport verifies that jwt is good, add in passport to return user info from payload


    //query db to find specific message from request assuming jwt auth is good
    Message.findById(req.params.id, function editMessage(err, doc) {

         if (err) {return next(err)};

        //check that message created by user in db matches jwt user
        // Pseudo: if(doc.user === payload.userId){}

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

    });


    res.send("edit message not implemented in backend yet");

}
};

//delete a message
exports.deleteMessage = (req, res, next) => {
    //add in auth check for admin credentials

        //find message by id that is passed through front end request and delete
        Message.findByIdAndRemove(req.params.id, function deleteMessage(err) {
            if (err) {return next(err)};
            res.send("message deleted successfully");
        });
}

//TODO- edit a message- do later

