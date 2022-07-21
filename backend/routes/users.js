const express = require('express');
const bcrypt = require('bcrypt');
const { signupUser, signinUser, signoutUser, authGoogle } = require('../controllers/userController');
const Users = require('../models/userModel');

const router = express.Router();

const isAuthenticated = function(req, res, next) {
    if (!req.username) return res.status(401).end("access denied");
    next();
};

const currentlySignedin = function(req, res, next){
    const user = await Users.findOne({ id:  req.session.userId })
    req.user = user
    next();
}


router.post('/signup/', signupUser);

router.post('/signin/', signinUser);

router.get('/signout/', signoutUser);

router.post('/auth/', authGoogle);

module.exports = router;