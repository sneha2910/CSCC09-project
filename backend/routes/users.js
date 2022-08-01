const express = require('express');
const bcrypt = require('bcrypt');
const { signupUser, signinUser, signoutUser, authGoogle, getMe } = require('../controllers/userController');
const Users = require('../models/userModel');
// const {protect} = require('../middleware/authMiddleware')

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


router.post('/signup/', signupUser);

router.post('/signin/', signinUser);

router.get('/signout/', signoutUser);

router.post('/auth/', authGoogle);

module.exports = router;