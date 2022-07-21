const Users = require('../models/userModel');
const saltRounds = 10;
const bcrypt = require('bcrypt');
const cookie = require('cookie');

const isAuthenticated = function(req, res, next) {
    if (!req.username) return res.status(401).end("access denied");
    next();
};

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

        user = await Users.create({username, email, password, isOnline: false});
        res.status(200).json({message: "User added successfully!"});

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
        console.log(err);
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