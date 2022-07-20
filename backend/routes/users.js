const express = require('express');
const bcrypt = require('bcrypt');
const { signupUser, signinUser, signoutUser } = require('../controllers/userController');

const router = express.Router();


router.post('/signup/', signupUser);

router.post('/signin/', signinUser);

router.get('/signout/', signoutUser);

module.exports = router;