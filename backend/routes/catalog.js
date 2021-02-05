//put all the routes in here that reference the controllers
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');


//create/post a new user
router.post('/user', userController.createUser);

//sign in user, put get privilege info for user as an action when signing in, store the info somewhere in state in the front end
router.get('/user/:id/signIn', userController.signIn);

//sign out user
router.get('/user/:id/signOut', userController.signOut);

//protected user profile route
router.get('/user/:id/profile', userController.profile);

//post a new message
router.post('/message',messageController.createMessage);

//get all messages for frontend display
router.get('/messages',messageController.getMessages);

//delete a message
router.delete('/message/:id',messageController.deleteMessage);

module.exports= router;