const express = require('express')
const router = express.Router()

//@route    GET api/auth
//@desc     Gets the logged in user
//@access   private
router.get('/', (req, res) => {
  res.send({msg: 'HELLO'})
})

//@route    POST api/auth
//@desc     Authenticates the user and gets token
//@access   public
router.post('/', (req, res) => {
  res.send({msg: 'HELLO'})
})

module.exports = router
