const Users = require('../models/userModel');
const { Worker } = require('worker_threads');
const saltRounds = 10;
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
const cookie = require('cookie');
const jwt = require('jsonwebtoken');


const signupUser = async (req, res) => {
    let {username, email, password} = req.body;
    if(!username || !email || !password) {
        return res.status(404).json({error: "Please enter all parameters!"});
    }

    bcrypt.hash(password, saltRounds, function(err, hash) {
        if(err) res.status(400).end({error: err});
        else if (hash) password = hash;
    });

    try {
        let user = await Users.findOne({ username: username });
        if (user){
            return res.status(409).json({error: "username " + username + " already exists"});
        }

        user = await Users.findOne({ email: email });
        if (user){
            return res.status(409).json({error: "Account exists with the given email! Log In instead."});
        }

        user = await Users.create({username, email, password, isOnline: false});

        let workerData = {action: 'signup', username: username, email: email};
        let worker = new Worker('./worker.js', {workerData: workerData});
        worker.once("message", (success) => {
            if (!success){
                res.status(400).json({error: "Email not sent!"});
                worker.terminate();
            }
            else{
                res.status(200).json({success: "User added successfully!"});
                res.redirect('/');
                worker.terminate();
            }
        });
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

const signinUser = async (req, res) => {
    let {email, password} = req.body;
    if(!email || !password) {
        return res.status(404).json({error: "Please enter all parameters!"});
    }

    try {   
        let user = await Users.findOne({ email: email });
        if (!user) return res.status(401).json("access denied");

        let result = await bcrypt.compare(password, user.password);
        if (!result) return res.status(401).json("access denied");
        req.session.username = user.username;
        res.setHeader('Set-Cookie', cookie.serialize('username', user.username, {
            maxAge: 60 * 60 * 24 * 7,
            path: '/'
        }));
        res.status(200).json({message: user.username + "successfully logged in!"});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

const authGoogle = async (req, res) => {
    const { token }  = req.body
     const ticket = await client.verifyIdToken({
         idToken: token,
         audience: process.env.CLIENT_ID
     });
     const payload = ticket.getPayload();
     const arr = payload['name'].split(' ');
     const username = arr[0];
     const email = payload['email'];
     const picture = payload['picture'];
    try {
        
        let user = await Users.findOne({ email: email });
        if (user){
            // await Users.findOneAndUpdate({ email: email }, {$push: { username: username }});
            req.session.username = username;
            console.log("session username" + req.session.username);
            res.setHeader('Set-Cookie', cookie.serialize('username', username, {
            maxAge: 60 * 60 * 24 * 7,
            path: '/'
            }));
            res.status(200).json({message: "Oath user" + username + "successfully logged in!"});
        }
        else{
        user = await Users.create({username, email, isOnline: false, picture});
        req.session.username = username;
        console.log("session set" + username);
        res.setHeader('Set-Cookie', cookie.serialize('username', username, {
            maxAge: 60 * 60 * 24 * 7,
            path: '/'
        }));
        res.status(200).json({success: username + "successfully logged in!"});
    }
    } catch (err) {
        res.status(400).json({error: err.message});
        console.log(err);
    }
};

const signoutUser = async function (req, res) {
    res.setHeader('Set-Cookie', cookie.serialize('username', '', {
        maxAge: -1,
        path: '/'
    }));
    req.session.destroy();
    res.status(200).json({success: "successfully logged out!"});
};

//@desc Get user data
//@route GET api/users/me
//@access Private
// const getMe = async (req, res) => {
//     const {_id, name, email, picture} = await User.findById(req.user.id)
//     res.status(200).json({
//         id:_id,
//         username,
//         email,
//         picture
//     })
// };

//generate jwt
// const generateToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '30d'})
// }

module.exports = {
    signupUser,
    signinUser,
    signoutUser,
    authGoogle,
    // getMe
};