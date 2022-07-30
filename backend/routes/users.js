const express = require('express');
const bcrypt = require('bcrypt');
const { signupUser, signinUser, signoutUser, authGoogle } = require('../controllers/userController');
const Users = require('../models/userModel');

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

const isAuthenticated = function(req, res, next) {
    if (!req.username) return res.status(401).end("access denied");
    next();
};

const currentlySignedin = async function(req, res, next){
    const user = await Users.findOne({ id:  req.session.username })
    req.user = user
    next();
}


router.post('/signup/', currentlySignedin, signupUser);

router.post('/signin/', currentlySignedin, signinUser);

router.get('/signout/', currentlySignedin, signoutUser);

router.post('/auth/', currentlySignedin, authGoogle);

module.exports = router;