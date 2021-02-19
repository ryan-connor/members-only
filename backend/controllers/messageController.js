//controller for message actions
const express = require('express');
const Message = require('../models/message');

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

//delete a message
exports.deleteMessage = (req, res, next) => {
        //find message by id that is passed through front end request and delete
        Message.findByIdAndRemove(req.params.id, function deleteMessage(err) {
            if (err) {return next(err)};
            res.send("message deleted successfully");
        });
}

//TODO- edit a message- do later

