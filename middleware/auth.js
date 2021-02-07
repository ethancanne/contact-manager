const User = require('../models/User')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    var decoded = jwt.verify(token, process.env.JWT_SECRET)

    //Only sign in if
    // 1. User exists and
    // 2. Token exists in the database (it is vaild)
    const user = await User.findOne({_id: decoded._id, 'tokens.token': token})

    if (!user) {
      throw new Error()
    }

    req.token = token
    req.user = user //The currently authenticated user
  } catch (error) {
    res.status(401).send({error: 'You are not authenticated'})
  }

  next()
}

module.exports = auth
