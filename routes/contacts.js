const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Contact = require('../models/Contact')

//@route    GET /contacts
//@desc     Get all users contact
//@access   private
router.get('/', auth, async (req, res) => {
  try {
    await req.user.populate({path: 'contacts'}).execPopulate()

    res.send(req.user.contacts)
  } catch (e) {
    res.status(500).send()
  }
})

//@route    POST /contacts
//@desc     Creates a contact
//@access   private
router.post('/', auth, async (req, res) => {
  req.body = {
    ...req.body,
    creator: req.user._id,
  }

  const contact = new Contact(req.body)
  try {
    await contact.save()
    res.send(contact)
  } catch (error) {
    res.status(500).send()
  }
})

//@route    PATCH /contacts:id
//@desc     Updates the contact
//@access   private
router.patch('/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body) //Takes the object's keys and puts it into an array
  const vaildUpdates = ['name', 'phone', 'type', 'email']
  const isValidUpdates = updates.every(update => vaildUpdates.includes(update))
  if (!isValidUpdates) {
    return res.status(400).send()
  }

  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      creator: req.user._id,
    })

    if (!contact) {
      return res.status(404).send()
    }

    updates.forEach(update => (contact[update] = req.body[update]))
    await contact.save()

    res.send()
  } catch (error) {
    return res.status(500).send()
  }
})

//@route    PATCH /contacts:id
//@desc     Deletes the contact
//@access   private
router.delete('/:id', auth, async (req, res) => {
  try {
    await Contact.findOneAndRemove({_id: req.params.id, creator: req.user._id})
    res.send()
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router
