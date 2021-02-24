//put all the routes in here that reference the controllers
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');

const jwt = require('jsonwebtoken');
const passport = require('passport');


//create/post a new user
router.post('/user', userController.validate() ,userController.createUser);

//sign in user, put get privilege info for user as an action when signing in, store the info somewhere in state in the front end
router.post('/user/:id/signIn', userController.validate(), userController.signIn);

//sign out user
router.get('/user/:id/signOut', userController.signOut);

//protected user profile route
router.use('/user/:id/profile', passport.authenticate('jwt', {session: false}));
router.get('/user/:id/profile', userController.profile);

//post a new message
router.post('/message', messageController.validate(),messageController.createMessage);

//get all messages for frontend display
router.get('/messages',messageController.getMessages);

//protected message routes
router.use('/message/:id', passport.authenticate('jwt', {session: false}));

//edit a message
router.put('/message/:id',messageController.validate(), messageController.editMessage);

//delete a message
router.delete('/message/:id',messageController.deleteMessage);

module.exports= router;