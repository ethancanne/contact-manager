const express = require('express')
const router = express.Router()

//@route    POST api/contacts
//@desc     Registers a user
//@access   public
router.post('/', (req, res) => {
  res.send({msg: 'HELLO'})
})

module.exports = router
