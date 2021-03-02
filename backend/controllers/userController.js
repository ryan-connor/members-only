//controller for user actions
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const hidden = require('../hidden');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');

//create/post a new user
exports.createUser = (req,res, next) => {

    //check validationresults for errors in validation/sanitization
    const errors= validationResult(req);
    // console.log("val errors:", errors);

    if (!errors.isEmpty()) {
        //errors exist in val/san
        res.status(422).json({errors});
        return;
    };

    //receive new user object from frontend
    //check that user doesn't already exist before creating
    User.findOne({username: req.body.username}).exec( (err, user) => {
        
        if (err) {
            return next (err);
        };
        if (user) {            
            return res.status(400).send("user already exists");
        };

    //hash password with bcrypt
    bcrypt.hash(req.body.password, hidden.salt, (err, hashedPassword) => {
        if (err) {
            
            return next(err);
        } else {
            //successfully hashed password

            let user = new User ({
                username: req.body.username,
                password: hashedPassword,
                privilege: "user",
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
});
};

//sign in user
exports.signIn = (req,res, next) => {

        //check validationresults for errors in validation/sanitization
        const errors= validationResult(req);
        // console.log("val errors:", errors);
    
        if (!errors.isEmpty()) {
            //errors exist in val/san
            res.status(422).json({errors});
            return;
        };

     // find user in db
    User.findOne({username: req.params.id}).exec( (err, user) => {
        
        if (err) {
            return next (err);
        };
        if (!user) {
            return res.status(400).send("user not found");
        };

        //compare password with hashed password with bcrpyt
        bcrypt.compare( req.body.password, user.password, (err, check)=> {
            if (err) {
                
                return next(err);
            };
            if (check) {
                
                //successful login

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
                
                return res.status(200).json({
                    message: 'sign in successful',
                    user: userResponse,
                    token: token,
                });

            } else {
                //login failed, passwords don't match
                return res.status(400).send("sign in failed");
            };
        })
       
    });
};


//currently signout on the backend is not implemented, 
// exports.signOut = (req,res, next) => {
// in the future this could be done by maintaining a blacklist of signed out JWTs that have not yet expired
// and checking JWTs against that list when authenticating
//   res.send("sign out for user not implemented yet");
// };

//TODO implement proper user profile page
// exports.profile = (req, res, next) => {
//     console.log("made it into profile route function");
//     // console.log("req:", req.user);
//     //protected route use passport jwt auth to access
//     res.send("this is a protected route for signed in user");
// };

//user validation/sanitization function, currently does basic check of request body for length, trim whitespace and escape HTML characters
exports.validate = () => {

    return [body('username','Invalid Username').trim().isLength({ min: 1 }).escape(),
            body('password','Invalid Password').trim().isLength({ min: 1 }).escape()
        ];
};