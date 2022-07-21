const Users = require('../models/userModel');
const saltRounds = 10;
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
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

const authGoogle = async (req, res) => {
// server.post("/api/v1/auth/google", async (req, res) => {
//     const { token }  = req.body
//     const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: process.env.CLIENT_ID
//     });
//     const { username, email, picture } = ticket.getPayload();    
    // const user = await db.user.upsert({ 
    //     where: { email: email },
    //     update: { name, picture },
    //     create: { name, email, picture }
    // })
    const { token }  = req.body
     const ticket = await client.verifyIdToken({
         idToken: token,
         audience: process.env.CLIENT_ID
     });
     const { username, email, picture } = ticket.getPayload(); 

    try {
        
        let user = await Users.findOne({ email: email });
        if (user){
            await Users.updateOne({ email: email }, {$push: { username: username }}, (err, res) => {
            res.status(200).json({message: "Oauth User exist and updated!"});
            req.session.userId = user.id
            console.log(res);
        });
        }
        else{
        user = await Users.create({username, email});
        res.status(200).json({message: "Oauth User added successfully!"});
        
        req.session.userId = user.id

        res.status(201)
        res.json(user)
        }

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
    signoutUser,
    authGoogle
};