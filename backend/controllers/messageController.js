//controller for message actions
const Message = require('../models/message');
const {body, validationResult} = require('express-validator');

//post a new message
exports.createMessage = (req, res, next) => {

    //check validationresults for errors in validation/sanitization
    const errors= validationResult(req);
    //console.log("val errors:", errors);

    if (!errors.isEmpty()) {
        //errors exist in val/san
        res.status(422).json({errors});
        return;
    };

        //get passed message object from frontend

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
            res.send( {messageList: listMessages}); 
        });
}

exports.editMessage = (req, res, next) => {

    //check validationresults for errors in validation/sanitization
        const errors= validationResult(req);
        // console.log("val errors:", errors);

        if (!errors.isEmpty()) {
            //errors exist in val/san
            res.status(422).json({errors});
            return;
        };

    //query db to find specific message from request
    Message.findById(req.params.id, function editMessage(err, doc) {

         if (err) {return next(err)};

        //check that message created by user in db matches jwt user
        if(doc.user.toString() === req.user.userid) {
            
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
};

//delete a message
exports.deleteMessage = (req, res, next) => {

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

    return [body('content','Message can not be blank').trim().isLength({ min: 1 }).escape(),
            body('datePosted','Invalid Date').trim().isLength({ min: 1 }).escape(),
            body('user', 'Invalid User').trim().isLength({min:1}).escape()
        ];
};

