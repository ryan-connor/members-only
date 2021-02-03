//put all the routes in here that reference the controllers
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const messageContoller = require('../controllers/messageController');

//create/post a new user
router.post('/user', userController.createUser);

//sign in user, leaving here for now, put get privilege info for user as an action when signing in, store the info somewhere in state in the front end, leaving both as get requests for now, will need to change
router.get('/user/:userid', userController.signIn);

//sign out user, leaving here for now
router.get('/user/:userid', userController.signOut);

//post a new message
router.post('/message',messageContoller.createMessage);

//get all messages for frontend display
router.get('/messages',messageContoller.getMessages);

//delete a message
router.delete('/message/:messageid',messageContoller.deleteMessage);

module.exports= router;