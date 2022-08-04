const express = require('express');
const { signupUser, signinUser, signoutUser, authGoogle} = require('../controllers/userController');

// router is an instance of the express router.
// We use it to define our routes.
// The router will take control of requests starting with path /record.
const router = express.Router();

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

//route to signup for a user
router.post('/signup/', signupUser);

//route to signin for a user
router.post('/signin/', signinUser);

//route to signout for a user user
router.get('/signout/', signoutUser);

//route to google oauth signup and signin for a user
router.post('/auth/', authGoogle);

module.exports = router;