const express = require('express')
const router = express.Router()

//@route    GET api/contacts
//@desc     Get all users contact
//@access   private
router.get('/', (req, res) => {
  res.send({msg: 'HELLO'})
})

//@route    POST api/contacts
//@desc     Creates a contact
//@access   private
router.post('/', (req, res) => {
  res.send({msg: 'HELLO'})
})

//@route    PATCH api/contacts:id
//@desc     Updates the contact
//@access   private
router.patch('/:id', (req, res) => {
  res.send({msg: 'HELLO'})
})

//@route    PATCH api/contacts:id
//@desc     Deletes the contact
//@access   private
router.delete('/:id', (req, res) => {
  res.send({msg: 'HELLO'})
})

module.exports = router
