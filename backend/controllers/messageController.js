//controller for message actions
const express = require('express');
const Message = require('../models/message');

//if db stuff doesn't work properly then try to change it function instead of arrow declaration

//TODO

//post a new message
app.post('/message', (req,res)=> {

    //get passed message object from frontend
    let message = new Message ({
        content: req.body.content,
        datePosted: "date here",
        user: req.body.user,
    });

    //save to mongodb
    message.save( function (err) {
        if (err) {
            return next(err);
        };
        res.send("message saved successfully");
    });

});


//get all messages for frontend display
app.get('/messages', (req,res) => {

    //query db to get all messages, find all, populate author, sort by date,
    Message.find({}, 'content datePosted user').populate('user').sort([['datePosted','ascending']]).exec(function (err, listMessages) {
        if (err) {return next(err)};
        //if no errors then return all messages
        res.send('messageList', {messageList: listMessages}); //see if returns a nice array or not
    });

});


//delete a message
app.delete('/message/:messageid', (req, res)=> {

    //find message by id that is passed through front end request and delete
    Message.findByIdAndRemove(req.body.messageid, function deleteMessage(err) {
        if (err) {return next(err)};
        res.send("message deleted successfully");
    });
 

});

//edit a message- do later

