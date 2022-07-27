const Users = require('../models/userModel');
const { Worker } = require('worker_threads');
const saltRounds = 10;
const bcrypt = require('bcrypt');
const cookie = require('cookie');


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
                res.status(200).json({message: "User added successfully!"});
                worker.terminate();
            }
        });

    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

const signinUser = async (req, res) => {
    let {username, password} = req.body;
    if(!username || !password) {
        return res.status(404).json({error: "Please enter all parameters!"});
    }

    try {   
        let user = await Users.findOne({ username: username });
        if (!user) return res.status(401).json("access denied");

        let result = await bcrypt.compare(password, user.password);
        if (!result) return res.status(401).json("access denied");
        req.session.username = username;
        res.setHeader('Set-Cookie', cookie.serialize('username', username, {
            maxAge: 60 * 60 * 24 * 7,
            path: '/'
        }));
        res.status(200).json({message: username + "successfully logged in!"});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

const signoutUser = function (req, res) {
    res.setHeader('Set-Cookie', cookie.serialize('username', '', {
        maxAge: -1,
        path: '/'
    }));
    req.session.destroy();
    res.status(200).json({success: "successfully logged out!"});
};

module.exports = {
    signupUser,
    signinUser,
    signoutUser
};