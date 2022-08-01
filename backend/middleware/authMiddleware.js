const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = equire('../models/userModel')

const protect = asyncHandler(async (req, res, next ) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{

    } catch (error) {
        
    }
  }
})

module.export = {protect}