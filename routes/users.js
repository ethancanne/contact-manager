const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth')
const router = express.Router()

//@route    POST /users
//@desc     Registers a user
//@access   public
router.post('/', async (req, res) => {
  const {name, email, password} = req.body

  const user = new User({name, email, password})

  try {
    const token = await user.generateAuthToken(user)
    await user.save()
    res.send({user, token})
  } catch (error) {
    res.status(500).send({error: error.message})
  }
})

//@route    POST users/login
//@desc     Authenticates the user and gets token
//@access   public
router.post('/login', async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.findByCredentials(email, password)
    const token = await user.generateAuthToken(user)
    res.send({user, token})
  } catch (error) {
    res.send({error: error.message})
  }
})

//@route    POST /users/logout
//@desc     Logsout the currently logged in user
//@access   private
router.post('/logout', auth, async (req, res) => {
  req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
  try {
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

//@route    GET /users
//@desc     Sends back the current user
//@access   private
router.get('/me', auth, async (req, res) => {
  res.send(req.user)
})

module.exports = router
